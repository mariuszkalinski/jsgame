import config from '../gameConfig/gameConfig';
import { GENERATE_ENEMIES, DESTROY_ENEMY, MOVE_ENEMY } from '../constants/constants';

const maxBoardSize = {
  x: config.gridSize.x / config.playerSize,
  y: config.gridSize.y / config.playerSize,
};

const initialState = () => {
  let temporaryInitialState = [];
  let baseId = 0;
  while (temporaryInitialState.length < config.enemiesCount) {
    const randomXCoordinate = Math.floor(Math.random() * (maxBoardSize.x));
    const randomYCoordinate = Math.floor(Math.random() * (maxBoardSize.y));
    baseId += 1;
    const newCoords = {
      id: `enemy_${baseId}`,
      x: randomXCoordinate,
      y: randomYCoordinate,
    };
    // const isRecordColideWithTree = trees.some(record => record.x === newCoords.x && record.y === newCoords.y);
    // const isRecordUnique = temporaryInitialState.some(record => record.x === newCoords.x && record.y === newCoords.y);
    // if (!isRecordUnique && !isRecordColideWithTree) {
    temporaryInitialState = [...temporaryInitialState, newCoords];
    // }
  }
  // console.log(maxTreasuresAmount);
  return temporaryInitialState;
};

const collisionSwitch = (position, object, param, oppositeParam) => {
  switch (true) {
    case (object[param] === position[param] + 1 && object[oppositeParam] === position[oppositeParam]):
      return -1;
    case (object[param] === position[param] - 1 && object[oppositeParam] === position[oppositeParam]):
      return 1;
    default:
      return 0;
  }
};
const move = (position, array, param) => {
  if (array.length) {
    if (array.some(x => x === 1) && array.some(x => x === -1)) {
      return position[param];
    } else if (array.some(x => x === 1)) {
      return param === 'x' ?
        position[param] + (Math.floor(Math.random() * 2)) : position[param] + (Math.floor(Math.random() * 2) - 1);
    } else if (array.some(x => x === -1)) {
      return param === 'x' ?
        position[param] + (Math.floor(Math.random() * 2) - 1) : position[param] + (Math.floor(Math.random() * 2));
    }
  } else {
    return position[param] + (Math.floor(Math.random() * 3) - 1);
  }
};
const enemyCollision = (position, trees) => {
  const arrayX = [];
  const arrayY = [];
  trees.forEach((tree) => {
    if (collisionSwitch(position, tree, 'x', 'y')) arrayX.push(collisionSwitch(position, tree, 'x', 'y'));
    if (collisionSwitch(position, tree, 'y', 'x')) arrayY.push(collisionSwitch(position, tree, 'y', 'x'));
  });
  return Object.assign({}, position, {
    x: move(position, arrayX, 'x'),
    y: move(position, arrayY, 'y'),
  });
};
export default function player(state = [], action) {
  switch (action.type) {
    case GENERATE_ENEMIES:
      return initialState();
    case DESTROY_ENEMY:
      return state;
    case MOVE_ENEMY:
      const currentObject = state.filter(x => x.id === action.payload.id)[0];
      return state.map((record) => {
        if (record.id === action.payload.id) {
          return enemyCollision(currentObject, action.payload.trees);
        }
        return record;
      });
    default:
      return state;
  }
}
