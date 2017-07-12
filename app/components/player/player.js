import Rx from 'rxjs';
import Component from '../../core/component/component';
import styles from './player.scss';
import {
  config
} from '../../gameConfig/gameConfig';
import move from '../../actions/player.actions';
import store from '../../index';
export default new Component({
  tagName: 'base-player',
  template: `
    <div></div>
  `,
  styles,
  controller: (scope) => {
    const gridBoxes = {
      x: config.gridSize.x / config.playerSize,
      y: config.gridSize.y / config.playerSize
    };
    const target = scope.target;
    target.style.width = config.playerSize;
    target.style.height = config.playerSize;
    const collision = (key) => {
      const playerPosition = store.getState().playerState;
      switch (key) {
        case 'ArrowLeft':
          return playerPosition.x > 0;
        case 'ArrowUp':
          return playerPosition.y > 0;
        case 'ArrowRight':
          return playerPosition.x < gridBoxes.x - 1;
        case 'ArrowDown':
          return playerPosition.y < gridBoxes.y - 1;
        default:
          return false;
      }

    }
    const playerStream = Rx.Observable.fromEvent(document, 'keydown')
      .takeWhile(event => (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown'))
      .filter(event => collision(event.key))
      .map(event => store.dispatch(move(event.key)))
      .map(event => store.getState().playerState)
      .subscribe(position => {
        target.style.left = position.x * config.playerSize;
        target.style.top = position.y * config.playerSize;
      });
  }
});