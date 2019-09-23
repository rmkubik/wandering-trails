import React from "react";
import Tile from "./Tile";
import isLocationInUnit from "../units/isLocationInUnit";
import isLocationHead from "../units/isLocationHead";
import "./Map.css";

const Map = ({ tiles, player, enemies, width, height }) => {
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

          if (isLocationInUnit(player, { row: rowIndex, col: colIndex })) {
            icon = "&";
          }

          if (isLocationHead(player, { row: rowIndex, col: colIndex })) {
            icon = "@";
          }

          if (isLocationInUnit(enemies[0], { row: rowIndex, col: colIndex })) {
            icon = "*";
          }

          if (isLocationHead(enemies[0], { row: rowIndex, col: colIndex })) {
            icon = "#";
          }

          return <Tile icon={icon} key={`${rowIndex}:${colIndex}`} />;
        })
      )}
    </div>
  );
};

export default Map;
