// @flow
import mockClans from '../../mock_data/clans';
import mockClanMembers from '../../mock_data/clanMembers';

export type State = {
  clans: Array<{
    clanId: string,
    clanName: string
  }>,
  clanMembers: Array<{
    clanId: string,
    userId: string,
    clanMemberScore: number
  }>
};
const initialState: State = { clans: mockClans, clanMembers: mockClanMembers };

export default function clansReducer(
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
