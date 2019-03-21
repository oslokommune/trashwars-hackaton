// @flow

import { combineReducers } from 'redux';

import ui from './ui';
import claims from './claims';

const rootReducer = combineReducers({
  ui,
  claims
});

export default rootReducer;
