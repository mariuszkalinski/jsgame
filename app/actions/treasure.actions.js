import { REMOVE_TREASURE, GENERATE_TREASURES } from '../constants/constants';

export default function treasureActions() {
  const generateTreasures = value => ({
    type: GENERATE_TREASURES,
    payload: value,
  });
  const removeTreasure = value => ({
    type: REMOVE_TREASURE,
    payload: value,
  });
  return {
    generateTreasures,
    removeTreasure,
  };
}
