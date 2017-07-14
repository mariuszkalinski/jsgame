// import config from '../gameConfig/gameConfig';
import { INCREASE_RESULT } from '../constants/constants';

export default function player(state = {
  score: 0,
}, action) {
  switch (action.type) {
    case INCREASE_RESULT:
      return Object.assign({}, state, {
        score: state.score + 1,
      });
    default:
      return state;
  }
}
