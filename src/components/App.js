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

const updatePlayer = ({ player, direction }) => {
  const playerHead = getHead(player);
  const newLocation = {
    col: playerHead.col + direction.col,
    row: playerHead.row + direction.row
  };

  return moveUnit(player, newLocation);
};

const App = ({ startTiles, width, height }) => {
  const [tiles, setTiles] = useState(startTiles);
  const [player, setPlayer] = useRefState(createUnit({ row: 0, col: 0 }));
  const [enemies, setEnemies] = useRefState([createUnit({ row: 5, col: 5 })]);

  useEffect(() => {
    keyboard.addListener("w", () => {
      const newPlayer = updatePlayer({
        player: player.current,
        direction: {
          row: -1,
          col: 0
        }
      });

      setPlayer(newPlayer);
    });
    keyboard.addListener("a", () => {
      const newPlayer = updatePlayer({
        player: player.current,
        direction: {
          row: 0,
          col: -1
        }
      });

      setPlayer(newPlayer);
    });
    keyboard.addListener("s", () => {
      const newPlayer = updatePlayer({
        player: player.current,
        direction: {
          row: 1,
          col: 0
        }
      });

      setPlayer(newPlayer);
    });
    keyboard.addListener("d", () => {
      const newPlayer = updatePlayer({
        player: player.current,
        direction: {
          row: 0,
          col: 1
        }
      });

      setPlayer(newPlayer);
    });

    // document.addEventListener("keydown", event => {
    //   if (keyDownFunctionMap[event.key]) {
    //     const location = keyDownFunctionMap[event.key](event);
    //     update({ setEnemies, enemies: enemies.current, location });
    //   }
    // });
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
