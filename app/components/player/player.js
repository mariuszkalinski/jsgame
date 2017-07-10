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
    const gridSize = { x: 600, y: 600};
    const playerSize = 50;
    const gridBoxes = {x: gridSize.x / playerSize, y: gridSize.y / playerSize};
    let playerPosition = {x: 0, y: 0};

    const target = scope.target;
    target.style.width = playerSize;
    target.style.height = playerSize;
    const range = 1;
    const goRight = () => {
      if (playerPosition.x < gridBoxes.x - 1) {
        playerPosition.x += range;
        target.style.left = playerPosition.x * playerSize;
      }
    }
    const goLeft = () => {
      if (playerPosition.x > 0) {
        playerPosition.x -= range;
        target.style.left = playerPosition.x * playerSize;
      }
    }
    const goUp = () => {
      if (playerPosition.y > 0) {
        playerPosition.y -= range;
        target.style.top = playerPosition.y * playerSize;
      }
    }
    const goDown = () => {
      if (playerPosition.y < gridBoxes.y - 1) {
        playerPosition.y += range;
        target.style.top = playerPosition.y * playerSize;
      }
    }
    // const source = Rx.Observable.fromEvent(document, 'keydown');
    // const subscribe = source.subscribe(event => {
    //   switch (event.key) {
    //     case 'ArrowUp':
    //       goUp();
    //       break;
    //     case 'ArrowDown':
    //       goDown();
    //       break;
    //     case 'ArrowLeft':
    //       goLeft();
    //       break;
    //     case 'ArrowRight':
    //       goRight();
    //       break;
    //     default:
    //       break;
    //   }
    // });
    const left = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowLeft')
      .subscribe(x => goLeft());
    const right = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowRight')
      .subscribe(x => goRight());      
  }
});