import Rx from 'rxjs';
import styles from './player.scss';
import config from '../../gameConfig/gameConfig';
import move from '../../actions/player.actions';
import store from '../../index';

export default class Player extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="treasure"></div>
    `;
    this.controller();
  }
  controller() {
    const gridBoxes = {
      x: config.gridSize.x / config.playerSize,
      y: config.gridSize.y / config.playerSize,
    };
    this.style.width = config.playerSize;
    this.style.height = config.playerSize;
    const collision = (key) => {
      const playerPosition = store.getState().playerState;
      const treesPosition = store.getState().treeState;
      const checkIfTreesPositionColideWithPlayer = (arrow) => {
        const doPlayerColideWithTree = (tree) => {
          switch (arrow) {
            case 'ArrowLeft':
              return tree.x === playerPosition.x - 1 && tree.y === playerPosition.y;
            case 'ArrowUp':
              return tree.x === playerPosition.x && tree.y === playerPosition.y - 1;
            case 'ArrowRight':
              return tree.x === playerPosition.x + 1 && tree.y === playerPosition.y;
            case 'ArrowDown':
              return tree.x === playerPosition.x && tree.y === playerPosition.y + 1;
            default:
          }
        };
        return treesPosition
          .some(tree => doPlayerColideWithTree(tree));
      };

      const doesItTouchRightEdge = playerPosition.x < gridBoxes.x - 1;
      const doesItTouchLeftEdge = playerPosition.x > 0;
      const doesItTouchTopEdge = playerPosition.y > 0;
      const doesItTouchBottomEdge = playerPosition.y < gridBoxes.y - 1;
      if (checkIfTreesPositionColideWithPlayer(key)) return;
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
      .filter((event) => {
        const isArrowLeft = event.key === 'ArrowLeft';
        const isArrowRight = event.key === 'ArrowRight';
        const isArrowUp = event.key === 'ArrowUp';
        const isArrowDown = event.key === 'ArrowDown';
        return (isArrowLeft || isArrowRight || isArrowUp || isArrowDown) && collision(event.key);
      })
      .map(event => store.dispatch(move(event.key)))
      .map(() => store.getState().playerState)
      .subscribe((position) => {
        this.style.left = position.x * config.playerSize;
        this.style.top = position.y * config.playerSize;
      });
  }
}
