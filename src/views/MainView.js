// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../style/colors';
import { setRandomVariable, setCurrentView } from '../redux/actions/ui';

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setRandomVariable: value => dispatch(setRandomVariable(value)),
    setCurrentView: currentView => dispatch(setCurrentView(currentView))
  };
};

type Props = {
  ui: Object,
  setRandomVariable: boolean => void,
  setCurrentView: string => void
};

type State = {};

class MainView extends Component<Props, State> {
  renderActiveAreas() {
    return ['Birkelunden', 'Schous Plass'].map(area => {
      return (
        <div className='list-item' key={area}>
          {area}
        </div>
      );
    });
  }

  render() {
    const { ui, setCurrentView } = this.props;
    return (
      <div className='page'>
        <div className='header'>
          <div className='profile'>
            <div className='profile__imagewrapper'>
              <img src='/img/profile.png' className='profile__image' />
              <a href='#' className='profile__imageupload' />
            </div>
          </div>
        </div>
        <div className='pageContent'>
          <div className='clan'>
            <div className='title'>Løkka deTrashers</div>
            <div>26 medlemmer</div>
          </div>
          <div className='label'>Kontrolert område</div>
          <div className='number'>13%</div>
          <div className='label'>Poeng</div>
          <div className='number'>6 728 600</div>
          <div>Aktive områder (2)</div>
          {this.renderActiveAreas()}
          <button onClick={() => setCurrentView('MAP')}>
            + Gjør krav på område
          </button>
        </div>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(MainView);
