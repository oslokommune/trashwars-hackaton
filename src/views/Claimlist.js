// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSelectedArea } from '../redux/actions/ui';
import { getAreaById } from '../selectors/areas';
import { getRelevantClaims } from '../selectors/claims';
import { State as ClaimState } from '../redux/reducers/claims';
import { State as AreaState } from '../redux/reducers/areas';

const mapStateToProps = state => ({
  ui: state.ui,
  claims: state.claims,
  areas: state.areas,
});

const mapDispatchToProps = dispatch => ({
  setSelectedArea: areaId => dispatch(setSelectedArea(areaId)),
});

type Props = {
  ui: Object,
  claims: ClaimState,
  areas: AreaState,
  setSelectedArea: string => void,
};

type State = {};

class Claimlist extends Component<Props, State> {
  render() {
    const { claims, ui, areas } = this.props;
    const relevantClaims = getRelevantClaims(claims.claims, ui.selectedClanId);
    const claimedAreas = relevantClaims.map(claim => {
      const area = getAreaById(areas, claim.areaId);
      return {
        claimId: claim.claimId,
        areaId: area.areaId,
        time: area.time,
      };
    });

    if (!claimedAreas) {
      return null;
    }

    return (
      <div className="claimlist">
        <ul>
          {claimedAreas.map(claim => (<li
            className={ui.selectedAreaId === claim.areaId ? 'selected' : ''}
            key={claim.areaId}
            onClick={() => this.props.setSelectedArea(claim.areaId)}>
              {claim.time}</li>))}
        </ul>
      </div>
    );
  }
}

export default (connect: any)(mapStateToProps, mapDispatchToProps)(Claimlist);
