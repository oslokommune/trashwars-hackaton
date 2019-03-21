// @flow

export type State = Array<{ areaId: string, claimTime: Date }>;

const initialState: State = [];

export default function claimsReducer(
  state: State = initialState,
  action: {
    type: string,
    claim: { areaId: string, claimTime: Date }
  }
): State {
  switch (action.type) {
    case 'SET_CLAIM':
      return [...state, action.claim];
    case 'REMOVE_CLAIM':
      let index = state.findIndex(claim => claim.areaId === action.areaId);
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
