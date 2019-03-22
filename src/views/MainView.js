// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import colors from '../style/colors';
import { setCurrentView } from '../redux/actions/ui';
import { getRelevantClaims } from '../selectors/claims';
import { getAreaById } from '../selectors/areas';
import { getClanName } from '../selectors/clans';

const mapStateToProps = state => {
  return {
    ui: state.ui,
    claims: state.claims,
    clans: state.clans,
    areas: state.areas,
    user: state.user
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
  setCurrentView: string => void,
  user: Object
};

type State = {};

class MainView extends Component<Props, State> {
  renderActiveAreas() {
    return getRelevantClaims().map(relevantClaim => {
      return (
        <div className='list-item' key={relevantClaim.areaId}>
          {getAreaById(this.props.areas, relevantClaim.areaId)}
        </div>
      );
    });
  }

  render() {
    const { ui, setCurrentView, claims, clans, user } = this.props;
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
            <div className='title'>{getClanName(clans, ui.selectedClanId)}</div>
            <div>26 medlemmer</div>
          </div>
          <div className='label'>Kontrolert område</div>
          <div className='number'>13%</div>
          <div className='label'>Poeng</div>
          <div className='number'>{user.userScore}</div>
          <div>Aktive områder {claims ? claims.length : 0}</div>
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
