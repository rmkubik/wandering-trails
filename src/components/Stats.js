import React from "react";

const Stats = ({ player }) => {
  return (
    <div>
      <h2>Stats</h2>
      <ul>
        <li>{`Size: ${player.tiles.length}/${player.maxLength}`}</li>
        <li>{`Speed: ${0}/${player.speed}`}</li>
      </ul>
    </div>
  );
};

export default Stats;
