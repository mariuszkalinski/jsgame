import config from '../gameConfig/gameConfig';
import { CREATE_TREE } from '../constants/constants';


const maxBoardSize = {
  x: config.gridSize.x / config.playerSize,
  y: config.gridSize.x / config.playerSize,
};

const initialState = () => {
  let temporaryInitialState = [];
  for (let i = 0; i <= config.treesAmount; i += 1) {
    const randomXCoordinate = Math.floor(Math.random() * (maxBoardSize.x));
    const randomYCoordinate = Math.floor(Math.random() * (maxBoardSize.y));
    const newCoords = {
      x: randomXCoordinate,
      y: randomYCoordinate,
    };
    temporaryInitialState = [...temporaryInitialState, newCoords];
  }
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
