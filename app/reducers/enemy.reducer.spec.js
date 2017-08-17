import { expect } from 'chai';
import { enemyCollision } from './enemy.reducer';

describe('Enemy reducer', () => {
  const treeState = [
    {
      x: 9,
      y: 0,
    },
    {
      x: 17,
      y: 14,
    },
    {
      x: 49,
      y: 23,
    },
    {
      x: 8,
      y: 13,
    },
  ];
  const position = {
    id: 'enemy_1',
    x: 9,
    y: 13,
  };
  it('should not colide with trees', () => {
    const result = enemyCollision(position, treeState);
    expect(result).to.not.deep.equal(position);
  });
});
