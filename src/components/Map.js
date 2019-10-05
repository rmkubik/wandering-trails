import React from "react";
import Tile from "./Tile";
import isLocationInUnit from "../units/isLocationInUnit";
import isLocationHead from "../units/isLocationHead";
import getInRangeLocations from "../abilities/getInRangeLocations";
import "./Map.css";
import getHead from "../units/getHead";
import areLocationsEqual from "../location/areLocationsEqual";
import config from "../utils/config";

const Map = ({ tiles, player, enemies, width, height, selectedAbility }) => {
  const inRangeTiles =
    selectedAbility.name &&
    getInRangeLocations({
      origin: getHead(player),
      ability: selectedAbility
    });

  return (
    <div
      className="map"
      style={{
        gridTemplateColumns: `${config.tileWidth}px `.repeat(width),
        gridTemplateRows: `${config.tileHeight}px `.repeat(height)
      }}
    >
      {tiles.map((row, rowIndex) =>
        row.map((tile, colIndex) => {
          let { icon } = tile;
          let backgroundColor = "";
          let borderColor = "";

          const entities = [player, ...enemies];

          const location = { row: rowIndex, col: colIndex };
          const entity = entities.find(entity =>
            isLocationInUnit(entity, location)
          );

          if (entity) {
            icon = isLocationHead(entity, location) ? entity.icon : "";
            backgroundColor = entity.color.background;
            borderColor = entity.color.border;
          }

          if (
            selectedAbility.name &&
            inRangeTiles.find(inRangeLocation =>
              areLocationsEqual(inRangeLocation, {
                row: rowIndex,
                col: colIndex
              })
            )
          ) {
            borderColor = "Yellow";
          }

          return (
            <Tile
              icon={icon}
              key={`${rowIndex}:${colIndex}`}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
            />
          );
        })
      )}
    </div>
  );
};

export default Map;
