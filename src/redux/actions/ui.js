// @flow

import {View} from '../actions/ui';

export function setRandomVariable(randomVariable: boolean) {
  return {
    type: 'SET_RANDOM_VARIABLE',
    randomVariable
  };
}

export function setCurrentView(currentView: View) {
  return {
    type: 'SET_CURRENT_VIEW',
    currentView,
  };
}
