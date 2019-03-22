// @flow

import { View } from '../actions/ui';

export function setCurrentView(currentView: View) {
  return {
    type: 'SET_CURRENT_VIEW',
    currentView
  };
}

export function showDrawer(showDrawer: boolean) {
  return {
    type: 'SHOW_DRAWER',
    showDrawer
  };
}

export function setSelectedArea(selectedAreaId: string) {
  return {
    type: 'SET_SELECTED_AREA',
    selectedAreaId
  };
}

export function setSelectedClan(selectedClanId: string) {
  return {
    type: 'SET_SELECTED_CLAN',
    selectedClanId
  };
}
