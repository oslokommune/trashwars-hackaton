// @flow

export function setClaim(claim: { areaId: string, claimTime: Date }) {
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
