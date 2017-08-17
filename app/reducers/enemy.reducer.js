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
const move = (position, arrayX, arrayY) => {
  const newPosition = position;

  const side = (Math.floor(Math.random() * 2));
  if(side) {
    if (arrayX.length) {
      if (arrayX.some(x => x === 1) && arrayX.some(x => x === -1)) {
        console.log('hej');
      } else if (arrayX.some(x => x === 1)) {
        newPosition.x = position.x + (Math.floor(Math.random() * 2));
      } else if (arrayX.some(x => x === -1)) {
        newPosition.x = position.x + (Math.floor(Math.random() * 2) - 1);
      }
    } else {
      newPosition.x = position.x + (Math.floor(Math.random() * 3) - 1);
    }
  } else {
    if (arrayY.length) {
      if (arrayY.some(x => x === 1) && arrayY.some(x => x === -1)) {
        console.log('hej');
      } else if (arrayY.some(x => x === 1)) {
        newPosition.y = position.y + (Math.floor(Math.random() * 2));
      } else if (arrayY.some(x => x === -1)) {
        newPosition.y = position.y + (Math.floor(Math.random() * 2) - 1);
      }
    } else {
      newPosition.y = position.y + (Math.floor(Math.random() * 3) - 1);
    }
  }

  return newPosition;
};
const enemyCollision = (position, trees) => {
  const arrayX = [];
  const arrayY = [];
  trees.forEach((tree) => {
    if (collisionSwitch(position, tree, 'x', 'y')) arrayX.push(collisionSwitch(position, tree, 'x', 'y'));
    if (collisionSwitch(position, tree, 'y', 'x')) arrayY.push(collisionSwitch(position, tree, 'y', 'x'));
  });
  return Object.assign({}, position, move(position, arrayX, arrayY));
};
function enemyState(state = [], action) {
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
export { enemyState, enemyCollision };
