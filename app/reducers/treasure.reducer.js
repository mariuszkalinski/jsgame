import config from '../gameConfig/gameConfig';
import { REMOVE_TREASURE, GENERATE_TREASURES } from '../constants/constants';
// import { store } from '../index';


const maxBoardSize = {
  x: config.gridSize.x / config.playerSize,
  y: config.gridSize.y / config.playerSize,
};
// const maxTreasuresAmount = maxBoardSize.x * maxBoardSize.y;
const initialState = (trees) => {
  let temporaryInitialState = [];
  while (temporaryInitialState.length < config.treasuresAmount) {
    const randomXCoordinate = Math.floor(Math.random() * (maxBoardSize.x));
    const randomYCoordinate = Math.floor(Math.random() * (maxBoardSize.y));
    const newCoords = {
      x: randomXCoordinate,
      y: randomYCoordinate,
    };
    const isRecordColideWithTree = trees.some(record => record.x === newCoords.x && record.y === newCoords.y);
    const isRecordUnique = temporaryInitialState.some(record => record.x === newCoords.x && record.y === newCoords.y);
    if (!isRecordUnique && !isRecordColideWithTree) {
      temporaryInitialState = [...temporaryInitialState, newCoords];
    }
  }
  // console.log(maxTreasuresAmount);
  return temporaryInitialState;
};

export default function treasure(state = [], action) {
  switch (action.type) {
    case GENERATE_TREASURES:
      return initialState(action.payload);
    case REMOVE_TREASURE:
      return state.filter(tree => !(tree.x === action.payload.x && tree.y === action.payload.y));
    default:
      return state;
  }
}
