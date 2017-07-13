import Rx from 'rxjs';
import Component from '../../core/component/component';
import styles from './player.scss';
import config from '../../gameConfig/gameConfig';
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
      y: config.gridSize.y / config.playerSize,
    };
    const target = scope.target;
    target.style.width = config.playerSize;
    target.style.height = config.playerSize;
    const collision = (key) => {
      const playerPosition = store.getState().playerState;
      const doesItTouchRightEdge = playerPosition.x < gridBoxes.x - 1;
      const doesItTouchLeftEdge = playerPosition.x > 0;
      const doesItTouchTopEdge = playerPosition.y > 0;
      const doesItTouchBottomEdge = playerPosition.y < gridBoxes.y - 1;

      switch (key) {
        case 'ArrowLeft':
          return doesItTouchLeftEdge;
        case 'ArrowUp':
          return doesItTouchTopEdge;
        case 'ArrowRight':
          return doesItTouchRightEdge;
        case 'ArrowDown':
          return doesItTouchBottomEdge;
        default:
          return false;
      }
    };

    Rx.Observable.fromEvent(document, 'keydown')
      .takeWhile((event) => {
        const isArrowLeft = event.key === 'ArrowLeft';
        const isArrowRight = event.key === 'ArrowRight';
        const isArrowUp = event.key === 'ArrowUp';
        const isArrowDown = event.key === 'ArrowDown';
        return (isArrowLeft || isArrowRight || isArrowUp || isArrowDown);
      })
      .filter(event => collision(event.key))
      .map(event => store.dispatch(move(event.key)))
      .map(() => store.getState().playerState)
      .subscribe((position) => {
        target.style.left = position.x * config.playerSize;
        target.style.top = position.y * config.playerSize;
      });
  },
});
