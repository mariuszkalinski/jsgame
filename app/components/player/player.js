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
    const gridSize = {
      x: 600,
      y: 600
    };
    const playerSize = 50;
    const gridBoxes = {
      x: gridSize.x / playerSize,
      y: gridSize.y / playerSize
    };
    let playerPosition = {
      x: 0,
      y: 0
    };

    const target = scope.target;
    target.style.width = playerSize;
    target.style.height = playerSize;
    const range = 1;

    const increase = (property, direction) => {
      playerPosition[property] += range;
      target.style[direction] = playerPosition[property] * playerSize;
    }
    const decrease = (property, direction) => {
      playerPosition[property] -= range;
      target.style[direction] = playerPosition[property] * playerSize;
    }
    const left = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowLeft' && playerPosition.x > 0)
    // .subscribe(x => decrease('x', 'left'));
    const right = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowRight' && playerPosition.x < gridBoxes.x - 1)
    // .subscribe(x => increase('x', 'left'));
    const top = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowUp' && playerPosition.y > 0)
    // .subscribe(x => decrease('y', 'top'));
    const bottom = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowDown' && playerPosition.y < gridBoxes.y - 1)
    // .subscribe(x => increase('y', 'top'));
  }
});