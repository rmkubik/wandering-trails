import React, { useState, useEffect } from "react";
import useRefState from "../utils/useRefState";
import createUnit from "../units/createUnit";
import getHead from "../units/getHead";
import moveUnit from "../units/moveUnit";
import Map from "./Map";
import Stats from "./Stats";
import Abilities from "./Abilities";
import update from "../lifecycle/update";
import "./App.css";

const App = ({ startTiles, width, height }) => {
  const [tiles, setTiles] = useState(startTiles);
  const [player, setPlayer] = useRefState(createUnit({ row: 0, col: 0 }));
  const [enemies, setEnemies] = useRefState([createUnit({ row: 5, col: 5 })]);

  useEffect(() => {
    const keyDownFunctionMap = {
      w: () => {
        const playerHead = getHead(player.current);
        const newLocation = {
          col: playerHead.col,
          row: playerHead.row - 1
        };
        const newPlayer = moveUnit(player.current, newLocation);
        setPlayer(newPlayer);

        return newLocation;
      },
      a: () => {
        const playerHead = getHead(player.current);
        const newLocation = {
          col: playerHead.col - 1,
          row: playerHead.row
        };
        const newPlayer = moveUnit(player.current, newLocation);
        setPlayer(newPlayer);

        return newLocation;
      },
      s: () => {
        const playerHead = getHead(player.current);
        const newLocation = {
          col: playerHead.col,
          row: playerHead.row + 1
        };
        const newPlayer = moveUnit(player.current, newLocation);
        setPlayer(newPlayer);

        return newLocation;
      },
      d: () => {
        const playerHead = getHead(player.current);
        const newLocation = {
          col: playerHead.col + 1,
          row: playerHead.row
        };
        const newPlayer = moveUnit(player.current, newLocation);
        setPlayer(newPlayer);

        return newLocation;
      }
    };

    document.addEventListener("keydown", event => {
      if (keyDownFunctionMap[event.key]) {
        const location = keyDownFunctionMap[event.key](event);
        update({ setEnemies, enemies: enemies.current, location });
      }
    });
  }, []);

  return (
    <div>
      <h1>Wandering Trails</h1>
      <main>
        <Map
          tiles={tiles}
          player={player.current}
          enemies={enemies.current}
          width={width}
          height={height}
        />
        <Stats player={player.current} />
        <Abilities player={player.current} />
      </main>
    </div>
  );
};

export default App;
