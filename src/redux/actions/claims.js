// @flow

export function setClaim(claim: {
  clanId: string,
  areaId: string,
  time: string
}) {
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

export function fulfillClaim(fulfilledClaim: {
}) {
  return {
    type: 'FULFILL_CLAIM',
    fulfilledClaim,
  };
}
