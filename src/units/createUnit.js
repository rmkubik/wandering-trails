import createAbility from "../abilities/createAbility";

export default function createUnit({
  row,
  col,
  maxLength = 4,
  speed = 1,
  abilities = [
    createAbility({ name: "Slice" }),
    createAbility({ name: "Hack" }),
    createAbility({ name: "Charge" })
  ],
  color: { border = "gray", background = "lightgray" } = {
    border: "gray",
    background: "lightgray"
  },
  icon = "?",
  owner = 0
}) {
  return {
    tiles: [
      {
        row,
        col
      }
    ],
    maxLength,
    speed,
    abilities,
    color: { border, background },
    icon,
    owner
  };
}
