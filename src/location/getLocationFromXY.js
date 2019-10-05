import config from "../utils/config";

export default function getLocationFromXY({ x, y }) {
  const [map] = document.getElementsByClassName("map");
  const { offsetLeft, offsetTop } = map;

  const row = Math.floor((y - offsetTop) / config.tileHeight);
  const col = Math.floor((x - offsetLeft) / config.tileWidth);

  return { row, col };
}
