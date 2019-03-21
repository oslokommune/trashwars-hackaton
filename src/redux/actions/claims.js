// @flow

export function setClaim(claim: { area: Object, claimTime: Date }) {
  return {
    type: 'SET_CLAIM',
    claim
  };
}

export function removeClaim(areaId) {
  return {
    type: 'REMOVE_CLAIM',
    areaId
  };
}
