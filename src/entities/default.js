import createUnit from "../units/createUnit";
import createAbility from "../abilities/createAbility";

const defaultEntities = [
  createUnit({
    row: 0,
    col: 0,
    abilities: [
      createAbility({ name: "Slice 1" }),
      createAbility({ name: "Slice 2", range: 2 }),
      createAbility({ name: "Slice 3", range: 3 })
    ],
    color: {
      background: "cyan",
      border: "darkturquoise"
    },
    icon: "🔪"
  }),
  createUnit({
    row: 5,
    col: 5,
    color: {
      background: "red",
      border: "crimson"
    },
    icon: "💀",
    owner: 1
  }),
  createUnit({
    row: 8,
    col: 6,
    color: {
      background: "red",
      border: "crimson"
    },
    icon: "💀",
    owner: 1
  })
];

export default defaultEntities;
