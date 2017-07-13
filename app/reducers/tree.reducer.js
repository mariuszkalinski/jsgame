// import config from '../gameConfig/gameConfig';
import { CREATE_TREE } from '../constants/constants';

const initialState = [
  {
    x: 3,
    y: 4,
  },
  {
    x: 10,
    y: 11,
  },
  {
    x: 19,
    y: 19,
  },
];
export default function tree(state = initialState, action) {
  switch (action.type) {
    case CREATE_TREE:
      return Object.assign({}, state, {
      });
    default:
      return state;
  }
}
