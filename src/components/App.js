import React, { useState, useEffect } from "react";
import useRefState from "../utils/useRefState";
import createUnit from "../units/createUnit";
import getHead from "../units/getHead";
import moveUnit from "../units/moveUnit";
import Map from "./Map";
import Stats from "./Stats";
import Abilities from "./Abilities";
import update from "../lifecycle/update";
import { Keyboard, Mouse } from "../lifecycle/input";
import "./App.css";
import createAbility from "../abilities/createAbility";
import config from "../utils/config";
import getLocationFromXY from "../location/getLocationFromXY";
import getInRangeLocations from "../abilities/getInRangeLocations";
import areLocationsEqual from "../location/areLocationsEqual";
import isMoveValid from "../units/isMoveValid";

const keyboard = new Keyboard();
const mouse = new Mouse();

const App = ({ startTiles }) => {
  const [tiles, setTiles] = useState(startTiles);
  const [player, setPlayer] = useRefState(
    createUnit({
      row: 0,
      col: 0,
      abilities: [
        createAbility({ name: "Slice 1" }),
        createAbility({ name: "Slice 2", range: 2 }),
        createAbility({ name: "Slice 3", range: 3 })
      ]
    })
  );
  const [enemies, setEnemies] = useRefState([createUnit({ row: 5, col: 5 })]);
  const [selectedAbility, setSelectedAbility] = useRefState({});

  const updatePlayer = ({ direction }) => {
    const playerHead = getHead(player.current);
    const newLocation = {
      col: playerHead.col + direction.col,
      row: playerHead.row + direction.row
    };

    if (
      !isMoveValid(
        player.current,
        newLocation,
        player.current,
        enemies.current,
        tiles
      )
    ) {
      // If move is invalid, do not move player and do not update the game state
      return;
    }

    const newPlayer = moveUnit(player.current, newLocation);
    setPlayer(newPlayer);

    update({
      setEnemies,
      location,
      enemies: enemies.current,
      player: player.current,
      tiles: tiles
    });
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
    mouse.addListener(mouse.LEFT_BUTTON, event => {
      const inRangeTiles =
        selectedAbility.current.name &&
        getInRangeLocations({
          origin: getHead(player.current),
          ability: selectedAbility.current
        });

      if (
        selectedAbility.current.name &&
        inRangeTiles.find(inRangeLocation =>
          areLocationsEqual(inRangeLocation, getLocationFromXY(event))
        )
      ) {
        console.log("attack", getLocationFromXY(event));
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
          width={config.width}
          height={config.height}
          selectedAbility={selectedAbility.current}
        />
        <Stats player={player.current} />
        <Abilities
          player={player.current}
          selectedAbility={selectedAbility.current}
          setSelectedAbility={setSelectedAbility}
        />
      </main>
    </div>
  );
};

export default App;
