import React from "react";
import Tile from "./Tile";
import isLocationInUnit from "../units/isLocationInUnit";
import isLocationHead from "../units/isLocationHead";
import getInRangeLocations from "../abilities/getInRangeLocations";
import "./Map.css";
import getHead from "../units/getHead";
import areLocationsEqual from "../location/areLocationsEqual";

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
        gridTemplateColumns: "32px ".repeat(width),
        gridTemplateRows: "32px ".repeat(height)
      }}
    >
      {tiles.map((row, rowIndex) =>
        row.map((tile, colIndex) => {
          let { icon } = tile;
          let backgroundColor = "";
          let borderColor = "";

          if (isLocationInUnit(player, { row: rowIndex, col: colIndex })) {
            icon = "";
            backgroundColor = "cyan";
            borderColor = "DarkTurquoise";
          }

          if (isLocationHead(player, { row: rowIndex, col: colIndex })) {
            icon = "🔪";
            backgroundColor = "cyan";
            borderColor = "DarkTurquoise";
          }

          if (isLocationInUnit(enemies[0], { row: rowIndex, col: colIndex })) {
            icon = "";
            backgroundColor = "red";
            borderColor = "crimson";
          }

          if (isLocationHead(enemies[0], { row: rowIndex, col: colIndex })) {
            icon = "💀";
            backgroundColor = "red";
            borderColor = "crimson";
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
            // backgroundColor = "";
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
