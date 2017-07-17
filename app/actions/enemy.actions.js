import { DESTROY_ENEMY, GENERATE_ENEMIES, MOVE_ENEMY } from '../constants/constants';

export default function enemyActions() {
  const generateEnemies = value => ({
    type: GENERATE_ENEMIES,
    payload: value,
  });
  const moveEnemy = value => ({
    type: MOVE_ENEMY,
    payload: value,
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
