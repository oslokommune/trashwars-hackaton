// @flow

export type View = 'MAIN' | 'LEADERBOARD';

export type State = {
  randomVariable: boolean,
  currentView: View,
  showDrawer: boolean
};

const initialState: State = {
  randomVariable: false,
  currentView: 'MAIN',
  showDrawer: true
};

export default function uiReducer(
  state: State = initialState,
  action: {
    type: string,
    ...State
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
        currentView: action.currentView
      };
    case 'SHOW_DRAWER':
      return {
        ...state,
        showDrawer: action.showDrawer
      };
    default:
      return state;
  }
}
