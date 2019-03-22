// @flow

import mockUsers from '../../mock_data/users';

export type State = {
  userId: ?string,
  districtId: ?string,
  username: ?string,
  userScore: ?number
};
const initialState: State = mockUsers[0];

export default function userReducer(
  state: State = initialState,
  action: {
    type: string,
    user: {
      userId: string,
      districtId: string,
      username: string,
      userScore: number
    }
  }
): State {
  switch (action.type) {
    case 'SET_USER':
      return action.user;
    case 'REMOVE_USER':
      return null;
    default:
      return state;
  }
}
