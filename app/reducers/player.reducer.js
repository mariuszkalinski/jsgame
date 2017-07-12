import {
  config
} from '../gameConfig/gameConfig';
import {
  PLAYER_MOVE
} from '../constants/constants';
export default function player(state = {
  x: 0,
  y: 0
}, action) {
  switch (action.type) {
    case PLAYER_MOVE:
      const range = 1;
      const property = action.payload === 'ArrowRight' || action.payload === 'ArrowLeft' ? 'x' : 'y';
      const direction = action.payload === 'ArrowRight' || action.payload === 'ArrowLeft' ? 'left' : 'top';
      const isPositive = action.payload === 'ArrowRight' || action.payload === 'ArrowDown';
      state[property] = isPositive ? state[property] + config.range : state[property] - config.range;
    default:
      return state
  }
}