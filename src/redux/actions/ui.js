// @flow

export function setRandomVariable(randomVariable: boolean) {
  return {
    type: 'SET_RANDOM_VARIABLE',
    randomVariable
  };
}
