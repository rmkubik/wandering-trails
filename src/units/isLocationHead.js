import areLocationsEqual from "../location/areLocationsEqual";

export default function isLocationHead(unit, location) {
  return areLocationsEqual(unit.tiles[0], location);
}
