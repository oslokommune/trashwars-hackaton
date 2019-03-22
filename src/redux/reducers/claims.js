// @flow
import mockClaims from '../../mock_data/claims';
import mockFulfilledClaims from '../../mock_data/fulfilledClaim';

export type State = {
  claims: Array<{ clanId: string, areaId: string, time: string }>,
  fulfilledClaim: Array<{
    clanId: string,
    areaId: string,
    finishedTime: string,
    points: number
  }>
};
const initialState: State = {
  claims: mockClaims,
  fulfilledClaim: mockFulfilledClaims
};

export default function claimsReducer(
  state: State = initialState,
  action: {
    type: string,
    areaId: string,
    claim: { clanId: string, areaId: string, time: string },
    fulfilledClaim: {
      clanId: string,
      areaId: string,
      finishedTime: string,
      points: number
    },
  }
): State {
  let index;
  switch (action.type) {
    case 'SET_CLAIM':
      return { ...state, claims: [...state.claims, action.claim] };
    case 'REMOVE_CLAIM':
      index = state.claims.findIndex(
        claim => claim.areaId === action.areaId
      );
      return {
        ...state,
        claims: [
          ...state.claims.slice(0, index),
          ...state.claims.slice(index + 1)
        ]
      };
    case 'FULFILL_CLAIM':
      index = state.claims.findIndex(
        claim => claim.areaId === action.areaId
      );
      return {
        ...state,
        fulfilledClaim: [
          ...state.fulfilledClaim,
          action.fulfilledClaim,
        ]
      };
    default:
      return state;
  }
}
