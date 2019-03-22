// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentView, showDrawer } from '../redux/actions/ui';
import { getRelevantClaims } from '../selectors/claims';
import { Claim, State as ClaimState } from '../redux/reducers/claims';

const mapStateToProps = state => ({
  ui: state.ui,
  claims: state.claims,
});

const mapDispatchToProps = dispatch => ({
});

type Props = {
  ui: Object,
  claims: ClaimState,
};

type State = {};

class Drawer extends Component<Props, State> {
  render() {
    const { claims, ui } = this.props;
    const clanClaims = getRelevantClaims(claims, ui.selectedClanId);

    if (!clanClaims) {
      return null;
    }

    return (
      <div>
        <ul>
          {clanClaims.map(claim => (<li>
            {claim
          </li>)}
        </ul>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(Drawer);

