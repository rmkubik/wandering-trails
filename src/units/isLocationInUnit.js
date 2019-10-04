import areLocationsEqual from "../location/areLocationsEqual";

export default function isLocationInUnit(unit, location) {
  return Boolean(
    unit.tiles.find(unitLocation => areLocationsEqual(unitLocation, location))
  );
}
