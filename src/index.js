import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";

function createTile() {
  return {
    name: "empty",
    icon: "."
  };
}

const width = 10;
const height = 10;

const startTiles = [];
for (let row = 0; row < height; row++) {
  startTiles[row] = [];
  for (let col = 0; col < width; col++) {
    startTiles[row][col] = createTile();
  }
}

ReactDOM.render(
  <App startTiles={startTiles} width={width} height={height} />,
  document.getElementById("app")
);
