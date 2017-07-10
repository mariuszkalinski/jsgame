import Component from '../../core/component/component';
import styles from './player.scss';
import Rx from 'rxjs';
export default new Component({
  tagName: 'base-player',
  template: `
    <div></div>
  `,
  styles,
  controller: (scope) => {
    const gridSize = [600, 600];
    const playerSize = 50;
    const gridBoxes = [gridSize[0] / playerSize, gridSize[1] / playerSize];
    let playerPosition = [0, 0];

    const target = scope.target;
    target.style.width = playerSize;
    target.style.height = playerSize;
    const range = 1;
    const goRight = () => {
      if (playerPosition[0] < gridBoxes[0] - 1) {
        playerPosition[0] += range;
        target.style.left = playerPosition[0] * playerSize;
      }
    }
    const goLeft = () => {
      if (playerPosition[0] > 0) {
        playerPosition[0] -= range;
        target.style.left = playerPosition[0] * playerSize;
      }
    }
    const goUp = () => {
      if (playerPosition[1] > 0) {
        playerPosition[1] -= range;
        target.style.top = playerPosition[1] * playerSize;
      }
    }
    const goDown = () => {
      if (playerPosition[1] < gridBoxes[1] - 1) {
        playerPosition[1] += range;
        target.style.top = playerPosition[1] * playerSize;
      }
    }
    const source = Rx.Observable.fromEvent(document, 'keydown');
    const subscribe = source.subscribe(event => {
      switch (event.key) {
        case 'ArrowUp':
          goUp();
          break;
        case 'ArrowDown':
          goDown();
          break;
        case 'ArrowLeft':
          goLeft();
          break;
        case 'ArrowRight':
          goRight();
          break;
        default:
          break;
      }
    });
  }
});