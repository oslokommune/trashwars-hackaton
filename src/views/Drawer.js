// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setCurrentView,
  showDrawer,
  setSelectedClan
} from '../redux/actions/ui';
import { getRelevantClans } from '../selectors/clans';

const mapStateToProps = state => {
  return {
    ui: state.ui,
    clans: state.clans,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setCurrentView: view => dispatch(setCurrentView(view)),
    showDrawer: show => dispatch(showDrawer(show)),
    setSelectedClan: clanId => dispatch(setSelectedClan(clanId))
  };
};

type Props = {
  ui: Object,
  clans: Object,
  user: Object,
  setCurrentView: Object => void,
  setSelectedClan: (?string) => void,
  showDrawer: boolean => void
};

type State = {};

class Drawer extends Component<Props, State> {
  onViewMain = () => {
    this.props.showDrawer(!this.props.ui.showDrawer);
    this.props.setCurrentView('MAIN');
  };

  onViewMap = () => {
    this.props.showDrawer(!this.props.ui.showDrawer);
    this.props.setCurrentView('MAP');
  };

  onViewLeaderboard = () => {
    this.props.showDrawer(!this.props.ui.showDrawer);
    this.props.setCurrentView('LEADERBOARD');
  };

  renderClans() {
    const { ui, clans, user, setSelectedClan } = this.props;
    return getRelevantClans(clans, user.userId).map(clan => {
      return (
        <li
          key={clan.clanId}
          className={
            ui.selectedClanId === clan.clanId
              ? 'nav__link nav__link--active'
              : 'nav__link'
          }
          onClick={() => {
            setSelectedClan(clan.clanId);
            this.onViewMain();
          }}
        >
          {clan.clanName}
        </li>
      );
    });
  }

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
            <li className='nav__link' onClick={this.onViewMap}>
              Kart
            </li>
            <li className='nav__link' onClick={this.onViewLeaderboard}>
              Leaderboard
            </li>
            <li className='nav__link'>Galleri</li>
          </ul>

          <p className='label'>Min tilhørighet</p>
          <ul className='nav__list'>{this.renderClans()}</ul>

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
