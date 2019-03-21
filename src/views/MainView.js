// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../style/colors';
import { setRandomVariable, setCurrentView } from '../redux/actions/ui';

const mapStateToProps = state => {
  return {
    ui: state.ui,
    claims: state.claims
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
  claims: Object,
  setRandomVariable: boolean => void,
  setCurrentView: string => void
};

type State = {};

class MainView extends Component<Props, State> {
  renderActiveAreas() {
    return this.props.claims.map(claim => {
      return (
        <div className='list-item' key={claim.area.area_id}>
          {claim.area.area_name}
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
          <div>Aktive områder {this.props.claims.length}</div>
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
