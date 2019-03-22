// @flow

export function setUser(user: {
  clanId: string,
  areaId: string,
  time: string
}) {
  return {
    type: 'SET_USER',
    user
  };
}

export function removeUser() {
  return {
    type: 'REMOVE_USER'
  };
}

export function addUserScore(score: number) {
  return {
    type: 'ADD_USER_SCORE',
    score
  };
}
