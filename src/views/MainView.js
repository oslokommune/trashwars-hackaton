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
  render() {
    const { ui, setRandomVariable } = this.props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          justifyContent: 'center'
        }}
      >
        <div
          onClick={() => {
            setRandomVariable(!ui.randomVariable);
          }}
          style={{
            marginTop: 100,
            height: 100,
            width: 300,
            backgroundColor: ui.randomVariable ? 'blue' : 'red'
          }}
        />
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(MainView);
