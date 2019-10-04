import isLocationInUnit from "./isLocationInUnit";

function isLocationBlocked(location, player, enemies) {
  return (
    isLocationInUnit(player, location) ||
    enemies.some(enemy => isLocationInUnit(enemy, location))
  );
}

export default function isMoveValid(unit, location, player, enemies) {
  return !isLocationBlocked(location, player, enemies);
}
