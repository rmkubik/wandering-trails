import config from "../utils/config";

export default function getLocationFromXY({ x, y }) {
  const [map] = document.getElementsByClassName("map");
  const { offsetLeft, offsetTop } = map;

  const row = Math.floor((x - offsetLeft) / config.tileWidth);
  const col = Math.floor((y - offsetTop) / config.tileHeight);

  return { row, col };
}
