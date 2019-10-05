export default function getPlayer(entities) {
  return entities.filter(entity => entity.owner === 0);
}
