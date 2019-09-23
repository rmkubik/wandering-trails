import React from "react";

const Tile = ({ icon, backgroundColor, borderColor }) => (
  <div
    style={{
      backgroundColor,
      border: `${borderColor} solid 2px`
    }}
  >
    {icon}
  </div>
);

export default Tile;
