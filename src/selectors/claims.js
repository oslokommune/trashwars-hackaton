export function getRelevantClaims(claims, selectedClan) {
  return claims ? claims.filter(claim => claim.clanId === selectedClan) : [];
}
