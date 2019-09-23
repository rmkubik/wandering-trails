import moveUnit from "../units/moveUnit";
import { randInt } from "../utils/random";

export default function update({ setEnemies, enemies, location }) {
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

    return moveUnit(enemy, newLocation);
  });

  setEnemies(newEnemies);
}
