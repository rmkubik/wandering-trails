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
import isLocationInUnit from "../units/isLocationInUnit";
import defaultEntities from "../entities/default";
import getPlayer from "../entities/getPlayer";
import getEnemies from "../entities/getEnemies";

const keyboard = new Keyboard();
const mouse = new Mouse();

const App = ({ startTiles }) => {
  const [tiles, setTiles] = useState(startTiles);
  const [entities, setEntities] = useRefState(defaultEntities);
  const [enemies, setEnemies] = useRefState([
    createUnit({
      row: 5,
      col: 5,
      color: {
        background: "red",
        border: "crimson"
      },
      icon: "💀"
    }),
    createUnit({
      row: 8,
      col: 6,
      color: {
        background: "red",
        border: "crimson"
      },
      icon: "💀"
    })
  ]);
  const [selectedAbility, setSelectedAbility] = useRefState({});

  const updatePlayer = ({ direction, ability, location }) => {
    const [player] = getPlayer(entities.current);
    const enemies = getEnemies(entities.current);
    const playerHead = getHead(player);
    const newLocation = {
      col: playerHead.col + direction.col,
      row: playerHead.row + direction.row
    };

    if (!isMoveValid(player, newLocation, player, enemies, tiles)) {
      // If move is invalid, do not move player and do not update the game state
      return;
    }

    const newPlayer = moveUnit(player, newLocation);
    // setPlayer(newPlayer);
    // hack to set first entity only, which is the player
    setEntities([newPlayer, ...entities.current.slice(1)]);

    update({
      setEnemies: enemies => {
        setEntities([entities.current[0], ...enemies]);
      },
      location,
      enemies,
      player,
      tiles
    });
  };

  useEffect(() => {
    keyboard.addListener("w", () => {
      updatePlayer({
        direction: {
          row: -1,
          col: 0
        },
        ability: createAbility({ name: "move" })
      });
    });
    keyboard.addListener("a", () => {
      updatePlayer({
        direction: {
          row: 0,
          col: -1
        },
        ability: createAbility({ name: "move" })
      });
    });
    keyboard.addListener("s", () => {
      updatePlayer({
        direction: {
          row: 1,
          col: 0
        },
        ability: createAbility({ name: "move" })
      });
    });
    keyboard.addListener("d", () => {
      updatePlayer({
        direction: {
          row: 0,
          col: 1
        },
        ability: createAbility({ name: "move" })
      });
    });

    mouse.addListener(mouse.LEFT_BUTTON, event => {
      const [player] = getPlayer(entities.current);
      const inRangeTiles =
        selectedAbility.current.name &&
        getInRangeLocations({
          origin: getHead(player),
          ability: selectedAbility.current
        });

      const location = getLocationFromXY(event);
      if (
        selectedAbility.current.name &&
        inRangeTiles.find(inRangeLocation =>
          areLocationsEqual(inRangeLocation, location)
        )
      ) {
        const targetedEntity = entities.current.find(entity =>
          isLocationInUnit(entity, location)
        );

        if (targetedEntity) {
          if (selectedAbility.current.effect === "dealDamage") {
            console.log("attack", targetedEntity, "at", location);
            // move this into an ability function somehow
            // setEnemies()
            // targetedEntity.tiles.slice();
          }
        } else {
          console.log("no targeted enemy");
        }
      }
    });
  }, []);

  const [currentPlayer] = getPlayer(entities.current);
  return (
    <div>
      <h1>Wandering Trails</h1>
      <main>
        <Map
          tiles={tiles}
          player={currentPlayer}
          enemies={getEnemies(entities.current)}
          width={config.width}
          height={config.height}
          selectedAbility={selectedAbility.current}
        />
        <Stats player={currentPlayer} />
        <Abilities
          player={currentPlayer}
          selectedAbility={selectedAbility.current}
          setSelectedAbility={setSelectedAbility}
        />
      </main>
    </div>
  );
};

export default App;
