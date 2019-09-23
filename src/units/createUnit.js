export default function createUnit({
  row,
  col,
  maxLength = 4,
  speed = 1,
  abilities = [
    {
      name: "Slice"
    },
    {
      name: "Hack"
    },
    {
      name: "Charge"
    }
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
