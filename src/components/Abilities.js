import React from "react";

const Abilities = ({ player }) => {
  return (
    <div>
      <h2>Abilities</h2>
      <ul>
        {player.abilities.map(ability => (
          <li key={ability.name}>
            <button>{ability.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Abilities;
