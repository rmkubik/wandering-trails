export default function createAbility({
  icon = "?",
  name = "Missing",
  range = 1,
  rangePattern = "cross",
  targetPattern = "square",
  targetRadius = 1,
  effect = "dealDamage",
  value = 1
}) {
  return {
    icon,
    name,
    range,
    rangePattern,
    targetPattern,
    targetRadius,
    effect,
    value
  };
}
