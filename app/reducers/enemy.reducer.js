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

export default function player(state = [], action) {
  switch (action.type) {
    case GENERATE_ENEMIES:
      return initialState();
    case DESTROY_ENEMY:
      return state;
    case MOVE_ENEMY:
      let currentObject = state.filter(x => x.id === action.payload)[0];
      currentObject = Object.assign({}, currentObject, {
        x: currentObject.x + 1,
      });
      return state.map((record) => {
        if (record.id === action.payload) {
          return Object.assign({}, currentObject, {
            x: currentObject.x + 1,
          });
        }
        return record;
      });
    default:
      return state;
  }
}
