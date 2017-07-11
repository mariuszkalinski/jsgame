import Rx from 'rxjs';
import Component from '../../core/component/component';
import styles from './player.scss';
import {config} from '../../gameConfig/gameConfig';
export default new Component({
  tagName: 'base-player',
  template: `
    <div></div>
  `,
  styles,
  controller: (scope) => {

    let playerPosition = {
      x: 0,
      y: 0
    };
    const gridBoxes = {
      x: config.gridSize.x / config.playerSize,
      y: config.gridSize.y / config.playerSize
    };
    const target = scope.target;
    target.style.width = config.playerSize;
    target.style.height = config.playerSize;
    const range = 1;

    const move = (property, direction, condition) => {
      playerPosition[property] = condition === 'increase' ? playerPosition[property] + range : playerPosition[property] - range;
      target.style[direction] = playerPosition[property] * config.playerSize;
      return playerPosition;
    }
    const left = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowLeft' && playerPosition.x > 0)
      .map(x => move('x', 'left', 'decrease'));
    const right = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => {console.log(config); return event.key === 'ArrowRight' && playerPosition.x < gridBoxes.x - 1})
      .map(x => move('x', 'left', 'increase'));
    const top = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowUp' && playerPosition.y > 0)
      .map(x => move('y', 'top', 'decrease'));
    const bottom = Rx.Observable.fromEvent(document, 'keydown')
      .filter(event => event.key === 'ArrowDown' && playerPosition.y < gridBoxes.y - 1)
      .map(x => move('y', 'top', 'increase'));
    const merged = left.merge(right, top, bottom)
      .subscribe(x => console.log(x));
  }
});