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
  ]
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
    abilities
  };
}
