// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../style/colors';
import { setCurrentView } from '../redux/actions/ui';
import { getAreaById } from '../selectors/areas';
import { getClanById } from '../selectors/clans';

const mapStateToProps = state => ({
  ui: state.ui,
  claims: state.claims,
  clans: state.clans,
  areas: state.areas
});

const mapDispatchToProps = dispatch => ({
  setCurrentView: currentView => dispatch(setCurrentView(currentView))
});

type Props = {
  ui: Object,
  claims: Object,
  clans: Object,
  areas: Object,
  setCurrentView: string => void
};

type State = {
  numberOfBags: number,
  pickUp: boolean,
};

class CompleteTakeOverView extends Component<Props, State> {
  fileInput = null;

  constructor(props) {
    super(props);
    this.state = {
      numberOfBags: 0,
      pickUp: false,
    };

    this.fileInput = React.createRef();
  }

  handleNumberOfBagsChange(event) {
    this.setState({
      numberOfBags: event.currentTarget.value
    });
  }

  handlePickUpChange(event) {
    this.setState({
      pickUp: event.currentTarget.value === 'yes',
    });
  }

  render() {
    const { ui, setCurrentView, areas } = this.props;
    const selectedArea = getAreaById(areas, ui.selectedAreaId);
    return (
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          padding: 20,
          zIndex: 2,
          alignItems: 'flex-start',
          height: '70%',
          width: '100%',
          backgroundColor: colors.background,
          bottom: 0,
          color: 'white'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <div
            style={{ color: colors.yellow, fontSize: 20, fontWeight: 'bold' }}
          >
            {selectedArea.areaName}
          </div>
          <div className='nav__close' onClick={() => setCurrentView('MAIN')} />
        </div>
        <div>Type: Park</div>
        <div>Størrelse: {selectedArea.size}m2</div>
        <div>Poengfaktor: {selectedArea.pointFactor}</div>
        <div
          style={{
            marginTop: 30,
            marginBottom: 10,
            color: 'lightGray',
            fontWeight: 'bold'
          }}
        >
          VELG BILDER Å LASTE OPP
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            fontWeight: 'bold',
            color: 'black',
            fontSize: 15
          }}
        >
          <div
            style={{
              flex: 1,
              height: 40,
              backgroundColor: 'white',
              marginRight: 5,
              paddingTop: 8
            }}
          >
            GALLERI
          </div>
          <label
            style={{
              flex: 1,
              height: 40,
              backgroundColor: 'white',
              marginLeft: 5,
              paddingTop: 8
            }}
          >
            TA BILDE
            <input
              type="file"
              accept="image/*"
              capture="camera"
              ref={this.fileInput}
              style={{
                display: 'block',
                height: 0,
                width: 0,
                marginLeft: -9999,
              }}/>
          </label>
        </div>
        <div
          style={{
            marginTop: 30,
            marginBottom: 10,
            color: 'lightGray',
            fontWeight: 'bold'
          }}
        >
          ANTALL POSER
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            fontWeight: 'bold',
            color: 'black',
            fontSize: 15
          }}
        >
          <input
            type='number'
            placeholder='0'
            style={{
              display: 'flex',
              flex: 1,
              height: 40,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#E6E6E9',
              backgroundColor: 'white',
              paddingLeft: 5,
              paddingTop: 8,
              paddingBottom: 8,
              paddingRight: 5,
              fontSize: 16
            }}
            value={this.state.numberOfBags}
            onChange={this.handleNumberOfBagsChange.bind(this)}
          />
        </div>
        <div
          style={{
            marginTop: 30,
            marginBottom: 10,
            color: 'lightGray',
            fontWeight: 'bold'
          }}
        >
          VI ØNSKER OPPHENTING
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            fontWeight: 'bold',
            color: 'black',
            fontSize: 15
          }}
        >
          <label
            style={{
              flex: 1,
              height: 40,
              backgroundColor: this.state.pickUp ? 'green' : 'white',
              marginRight: 5,
              paddingTop: 8
            }}
          >
            JA
            <input
              type="checkbox"
              name="pickUp"
              value="yes"
              checked={this.state.pickUp}
              onChange={this.handlePickUpChange.bind(this)}
              style={{
                display: 'block',
                height: 0,
                width: 0,
                marginLeft: -9999,
              }} />
          </label>
          <label
            style={{
              flex: 1,
              height: 40,
              backgroundColor: this.state.pickUp ? 'white' : 'green',
              marginLeft: 5,
              paddingTop: 8
            }}
          >
            NEI
            <input
              type="checkbox"
              name="pickUp"
              value="no"
              checked={!this.state.pickUp}
              onChange={this.handlePickUpChange.bind(this)}
              style={{
                display: 'block',
                height: 0,
                width: 0,
                marginLeft: -9999,
              }} />
          </label>
        </div>
        <button
          style={{
            height: 40,
            width: '100%',
            backgroundColor: 'green',
            color: 'white',
            marginTop: 30,
            paddingTop: 8,
            fontWeight: 'bold'
          }}
        >
          FULLFØR
        </button>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(
  CompleteTakeOverView
);
