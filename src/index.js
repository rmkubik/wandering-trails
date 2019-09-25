import ReactDOM from "react-dom";
import React from "react";
import App from "./components/App";
import config from "./utils/config";

function createTile() {
  return {
    name: "empty",
    icon: "."
  };
}

const startTiles = [];
for (let row = 0; row < config.height; row++) {
  startTiles[row] = [];
  for (let col = 0; col < config.width; col++) {
    startTiles[row][col] = createTile();
  }
}

ReactDOM.render(
  <App startTiles={startTiles} />,
  document.getElementById("app")
);
