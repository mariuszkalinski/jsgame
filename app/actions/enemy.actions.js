import { DESTROY_ENEMY, GENERATE_ENEMIES, MOVE_ENEMY } from '../constants/constants';

export default function enemyActions() {
  const generateEnemies = value => ({
    type: GENERATE_ENEMIES,
    payload: value,
  });
  const moveEnemy = (id, trees, treasures) => ({
    type: MOVE_ENEMY,
    payload: {
      id,
      trees,
      treasures,
    },
  });
  const removeEnemy = value => ({
    type: DESTROY_ENEMY,
    payload: value,
  });
  return {
    generateEnemies,
    moveEnemy,
    removeEnemy,
  };
}
