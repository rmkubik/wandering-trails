export default function getEnemies(entities) {
  return entities.filter(entity => entity.owner === 1);
}
