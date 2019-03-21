// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentView, showDrawer } from '../redux/actions/ui';

const mapStateToProps = state => {
  return {
    ui: state.ui
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentView: view => dispatch(setCurrentView(view)),
    showDrawer: show => dispatch(showDrawer(show))
  };
};

type Props = {
  ui: Object,
  setCurrentView: Object => void,
  showDrawer: boolean => void
};

type State = {};

class Drawer extends Component<Props, State> {
  onViewMain = () => {
    this.props.setCurrentView('MAIN');
  };

  onViewLeaderboard = () => {
    this.props.setCurrentView('LEADERBOARD');
  };

  render() {
    const { ui, showDrawer } = this.props;
    return (
      <div>
        <div
          className='nav__open'
          onClick={() => {
            this.props.showDrawer(!ui.showDrawer);
          }}
        />

        {/* Class nav--is-open to open menu */}
        <nav className={ui.showDrawer ? 'nav nav--is-open' : 'nav'}>
          <div
            className='nav__close'
            onClick={() => this.props.showDrawer(!ui.showDrawer)}
          />
          <ul className='nav__list'>
            <li className='nav__link'>Nyhetsstrøm</li>
            <li className='nav__link'>Kart</li>
            <li className='nav__link' onClick={this.onViewLeaderboard}>
              Leaderboard
            </li>
            <li className='nav__link'>Galleri</li>
          </ul>

          <p className='nav__label'>Min tilhørighet</p>
          <ul className='nav__list'>
            <li className='nav__link'>Cliff Kenneth Barterud</li>
            <li
              className='nav__link nav__link--active'
              onClick={this.onViewMain}
            >
              Løkka deTrashers
            </li>
            <li className='nav__link'>Bøler Søppelfotball</li>
          </ul>

          <ul className='nav__list'>
            <li className='nav__link'>Innstillinger</li>
            <li className='nav__link'>Logg ut</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(Drawer);
