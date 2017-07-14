import { INCREASE_RESULT } from '../constants/constants';

export default function scoreActions() {
  const increaseScore = value => ({
    type: INCREASE_RESULT,
    payload: value,
  });
  return {
    increaseScore,
  };
}
