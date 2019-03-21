// @flow

export type View = 'MAIN' | 'LEADERBOARD';

export type State = {
  randomVariable: boolean,
  currentView: View,
};

const initialState: State = {
  randomVariable: false,
  currentView: 'MAIN',
};

export default function uiReducer(
  state: State = initialState,
  action: {
    type: string,
    ...State,
  }
): State {
  switch (action.type) {
    case 'SET_RANDOM_VARIABLE':
      return {
        ...state,
        randomVariable: action.randomVariable
      };
    case 'SET_CURRENT_VIEW':
      return {
        ...state,
        currentView: action.currentView,
      };
    default:
      return state;
  }
}
