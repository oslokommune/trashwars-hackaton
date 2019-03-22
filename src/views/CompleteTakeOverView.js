// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../style/colors';
import { setCurrentView } from '../redux/actions/ui';
import { getAreaById } from '../selectors/areas';
import { getClanById } from '../selectors/clans';

const mapStateToProps = state => {
  return {
    ui: state.ui,
    claims: state.claims,
    clans: state.clans,
    areas: state.areas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentView: currentView => dispatch(setCurrentView(currentView))
  };
};

type Props = {
  ui: Object,
  claims: Object,
  clans: Object,
  areas: Object,
  setCurrentView: string => void
};

type State = {
  numberOfBags: number
};

class CompleteTakeOverView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBags: 0
    };
  }

  handleNumberOfBagsChange(event) {
    this.setState({
      numberOfBags: event.target.value
    });
  }

  render() {
    const { ui, setCurrentView, claims, clans, areas } = this.props;
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
          <div
            style={{
              flex: 1,
              height: 40,
              backgroundColor: 'white',
              marginLeft: 5,
              paddingTop: 8
            }}
          >
            TA BILDE
          </div>
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
          <div
            style={{
              flex: 1,
              height: 40,
              backgroundColor: 'white',
              marginRight: 5,
              paddingTop: 8
            }}
          >
            JA
          </div>
          <div
            style={{
              flex: 1,
              height: 40,
              backgroundColor: 'white',
              marginLeft: 5,
              paddingTop: 8
            }}
          >
            NEI
          </div>
        </div>
        <div
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
        </div>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(
  CompleteTakeOverView
);
