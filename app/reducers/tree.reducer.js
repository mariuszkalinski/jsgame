import config from '../gameConfig/gameConfig';
import { CREATE_TREE } from '../constants/constants';


const maxBoardSize = {
  x: config.gridSize.x / config.playerSize,
  y: config.gridSize.y / config.playerSize,
};
const maxTreesAmount = maxBoardSize.x * maxBoardSize.y;
const initialState = () => {
  let temporaryInitialState = [];
  while (temporaryInitialState.length < config.treesAmount) {
    const randomXCoordinate = Math.floor(Math.random() * (maxBoardSize.x));
    const randomYCoordinate = Math.floor(Math.random() * (maxBoardSize.y));
    const newCoords = {
      x: randomXCoordinate,
      y: randomYCoordinate,
    };
    const isRecordUnique = temporaryInitialState.some(record => record.x === newCoords.x && record.y === newCoords.y);
    if (!isRecordUnique) {
      temporaryInitialState = [...temporaryInitialState, newCoords];
    }
  }
  console.log(maxTreesAmount);
  return temporaryInitialState;
};

export default function tree(state = initialState(), action) {
  switch (action.type) {
    case CREATE_TREE:
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
}
