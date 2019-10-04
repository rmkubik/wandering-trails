import moveUnit from "../units/moveUnit";
import { randInt } from "../utils/random";
import isMoveValid from "../units/isMoveValid";

export default function update({
  setEnemies,
  player,
  enemies,
  location,
  tiles
}) {
  const newEnemies = enemies.map(enemy => {
    const direction = randInt(0, 3);

    const newLocation = { ...enemy.tiles[0] };

    switch (direction) {
      case 0:
        // left
        newLocation.row = newLocation.row - 1;
        break;
      case 1:
        // up
        newLocation.col = newLocation.col - 1;
        break;
      case 2:
        // right
        newLocation.row = newLocation.row + 1;
        break;
      case 3:
        // down
        newLocation.col = newLocation.col + 1;
        break;
      default:
        break;
    }

    if (isMoveValid(enemy, newLocation, player, enemies, tiles)) {
      // Only move the unit if its a valid location,
      // for now this means the unit will randomly throw away
      // its moves
      return moveUnit(enemy, newLocation);
    } else {
      return enemy;
    }
  });

  setEnemies(newEnemies);
}
