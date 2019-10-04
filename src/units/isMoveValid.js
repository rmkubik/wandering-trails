import isLocationInUnit from "./isLocationInUnit";

function isLocationBlocked(location, player, enemies) {
  return (
    isLocationInUnit(player, location) ||
    enemies.some(enemy => isLocationInUnit(enemy, location))
  );
}

function isLocationInMap(tiles, location) {
  return Boolean(
    tiles.find((row, rowIndex) =>
      row.find(
        (_, colIndex) => location.row === rowIndex && location.col === colIndex
      )
    )
  );
}

export default function isMoveValid(unit, location, player, enemies, tiles) {
  return (
    isLocationInMap(tiles, location) &&
    !isLocationBlocked(location, player, enemies)
  );
}
