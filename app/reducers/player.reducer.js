import config from '../gameConfig/gameConfig';
import { PLAYER_MOVE } from '../constants/constants';

export default function player(state = {
  x: 0,
  y: 0,
}, action) {
  const isArrowRight = action.payload === 'ArrowRight';
  const isArrowLeft = action.payload === 'ArrowLeft';
  const property = isArrowRight || isArrowLeft ? 'x' : 'y';
  const isPositive = action.payload === 'ArrowRight' || action.payload === 'ArrowDown';

  switch (action.type) {
    case PLAYER_MOVE:
      return Object.assign({}, state, {
        [property]: isPositive ? state[property] + config.range : state[property] - config.range,
      });
    default:
      return state;
  }
}
