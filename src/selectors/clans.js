export function getClanName(clans, clanId) {
  const clan = clans.clans.find(clan => clan.clanId === clanId);
  if (clan) {
    return clan.clanName;
  }
  return null;
}

export function getClanById(clans, clanId) {
  return clans.find(clan => clan.clanId === clanId);
}

export function getRelevantClans(clans, userId) {
  const myClanMemberships = clans.clanMembers.filter(
    clanMember => clanMember.userId === userId
  );
  const myClans = clans.clans.filter(clan =>
    myClanMemberships.find(
      clanMembership => clanMembership.clanId === clan.clanId
    )
  );
  return myClans;
}
