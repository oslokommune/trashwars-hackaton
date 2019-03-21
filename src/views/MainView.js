// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRandomVariable } from '../redux/actions/ui';

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRandomVariable: value => dispatch(setRandomVariable(value))
  };
};

type Props = {
  ui: Object,
  setRandomVariable: boolean => void
};

type State = {};

class MainView extends Component<Props, State> {
  renderActiveAreas() {
    return ['Birkelunden', 'Schous Plass'].map(area => {
      return (
        <div
          key={area}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 20,
            backgroundColor: 'lightGray',
            marginBottom: 10,
            marginRight: 30,
            marginLeft: 30,
            padding: 10
          }}
        >
          {area}
        </div>
      );
    });
  }

  render() {
    const { ui, setRandomVariable } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          margin: 0,
          padding: 0,
          backgroundColor: 'lightGray'
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 200,
            backgroundColor: 'darkBlue'
          }}
        >
          <div style={{ color: 'yellow' }}>Løkka deTrashers</div>
          <div style={{ color: 'white' }}>26 medlemmer</div>
          <div style={{ color: 'white' }}>Kontrolert område: 13%</div>
          <div style={{ color: 'white' }}>POENG</div>
          <div style={{ color: 'white' }}>6728600</div>
          <div style={{ color: 'white' }}>Aktive områder (2)</div>
          {this.renderActiveAreas()}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 20,
              backgroundColor: 'black',
              marginBottom: 60,
              marginRight: 30,
              marginLeft: 30,
              padding: 10,
              color: 'lightBlue'
            }}
          >
            + Gjør krav på område
          </div>
        </div>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(MainView);
