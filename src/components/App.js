import React, { useState, useEffect } from "react";
import useRefState from "../utils/useRefState";
import createUnit from "../units/createUnit";
import getHead from "../units/getHead";
import moveUnit from "../units/moveUnit";
import Map from "./Map";
import Stats from "./Stats";
import Abilities from "./Abilities";
import update from "../lifecycle/update";
import { Keyboard } from "../lifecycle/input";
import "./App.css";

const keyboard = new Keyboard();

const App = ({ startTiles, width, height }) => {
  const [tiles, setTiles] = useState(startTiles);
  const [player, setPlayer] = useRefState(createUnit({ row: 0, col: 0 }));
  const [enemies, setEnemies] = useRefState([createUnit({ row: 5, col: 5 })]);

  const updatePlayer = ({ direction }) => {
    const playerHead = getHead(player.current);
    const newLocation = {
      col: playerHead.col + direction.col,
      row: playerHead.row + direction.row
    };

    const newPlayer = moveUnit(player.current, newLocation);
    setPlayer(newPlayer);

    update({ setEnemies, enemies: enemies.current, location });
  };

  useEffect(() => {
    keyboard.addListener("w", () => {
      updatePlayer({
        direction: {
          row: -1,
          col: 0
        }
      });
    });
    keyboard.addListener("a", () => {
      updatePlayer({
        direction: {
          row: 0,
          col: -1
        }
      });
    });
    keyboard.addListener("s", () => {
      updatePlayer({
        direction: {
          row: 1,
          col: 0
        }
      });
    });
    keyboard.addListener("d", () => {
      updatePlayer({
        direction: {
          row: 0,
          col: 1
        }
      });
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
