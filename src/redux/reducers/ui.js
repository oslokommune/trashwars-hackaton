// @flow

type State = {
  randomVariable: boolean
};

const initialState: State = {
  randomVariable: false
};

export default function uiReducer(
  state: State = initialState,
  action: {
    type: string,
    randomVariable: boolean
  }
): State {
  switch (action.type) {
    case 'SET_RANDOM_VARIABLE':
      return {
        ...state,
        randomVariable: action.randomVariable
      };
    default:
      return state;
  }
}
