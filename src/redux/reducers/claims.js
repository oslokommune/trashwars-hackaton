// @flow

export type State = Array<{ area: Object, claimTime: Date }>;

const initialState: State = [];

export default function claimsReducer(
  state: State = initialState,
  action: {
    type: string,
    claim: { area: Object, claimTime: Date }
  }
): State {
  switch (action.type) {
    case 'SET_CLAIM':
      return [...state, action.claim];
    case 'REMOVE_CLAIM':
      let index = state.findIndex(
        claim => claim.area.area_id === action.areaId
      );
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
}
