// @flow
import mockAreas from '../../mock_data/areas';

export type State = Array<{
  areaId: string,
  districtId: string,
  areaName: string,
  pointFactor: number,
  size: number,
  time: number,
  polygon: Object
}>;

const initialState = mockAreas;

export default function areasReducer(
  state: State = initialState,
  action: {
    type: string
  }
): State {
  switch (action.type) {
    default:
      return state;
  }
}
