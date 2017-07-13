import PLAYER_MOVE from '../constants/constants';

const move = value => ({
  type: PLAYER_MOVE,
  payload: value,
});

export default move;
