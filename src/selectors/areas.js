export function getAreaById(areas, areaId) {
  return areas.find(area => area.areaId === areaId);
}

export function getAreaClaim(claims, areaId) {
  return claims.find(claim => claim.areaId === areaId);
}
