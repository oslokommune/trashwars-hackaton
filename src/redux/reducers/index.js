// @flow

import { combineReducers } from 'redux';

import ui from './ui';
import claims from './claims';
import user from './user';
import areas from './areas';
import clans from './clans';

const rootReducer = combineReducers({
  ui,
  claims,
  user,
  areas,
  clans
});

export default rootReducer;
