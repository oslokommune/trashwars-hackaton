// @flow

export type View = 'MAIN' | 'LEADERBOARD';

export type State = {
  randomVariable: boolean,
  currentView: View,
  showDrawer: boolean,
  selectedClanId: string
};

const initialState: State = {
  randomVariable: false,
  currentView: 'MAIN',
  showDrawer: false,
  selectedClanId: '0'
};

export default function uiReducer(
  state: State = initialState,
  action: {
    type: string,
    ...State
  }
): State {
  switch (action.type) {
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
    case 'SET_SELECTED_CLAN':
      return {
        ...state,
        selectedClanId: action.selectedClanId
      };
    default:
      return state;
  }
}
