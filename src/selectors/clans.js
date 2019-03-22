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
