import areLocationsEqual from "../location/areLocationsEqual";

export default function isLocationInUnit(unit, location) {
  return unit.tiles.find(unitLocation =>
    areLocationsEqual(unitLocation, location)
  );
}
