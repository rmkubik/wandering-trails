export default function moveUnit(unit, location) {
  const newUnit = { ...unit };
  newUnit.tiles = [location, ...unit.tiles];

  if (newUnit.tiles.length > newUnit.maxLength) {
    newUnit.tiles.pop();
  }

  return newUnit;
}
