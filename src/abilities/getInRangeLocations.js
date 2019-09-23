export default function getInRangeLocations({ origin, ability }) {
  if (ability.rangePattern === "cross") {
    const tiles = [];

    for (let r = 1; r <= ability.range; r++) {
      tiles.push({
        row: origin.row - r,
        col: origin.col
      });
      tiles.push({
        row: origin.row + r,
        col: origin.col
      });
      tiles.push({
        row: origin.row,
        col: origin.col - r
      });
      tiles.push({
        row: origin.row,
        col: origin.col + r
      });
    }

    return tiles;
  }
}
