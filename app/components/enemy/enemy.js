import styles from './enemy.scss';
import config from '../../gameConfig/gameConfig';
import store from '../../index';
import enemyActions from '../../actions/enemy.actions';

export default class Enemy extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div></div>
    `;
    this.enemyActions = enemyActions();
    this.positionX = this.getAttribute('left');
    this.positionY = this.getAttribute('top');
    this.id = this.getAttribute('id');
    this.setSize();
    this.setPosition();
    this.changePosition();
  }
  setSize() {
    this.style.width = config.playerSize;
    this.style.height = config.playerSize;
  }
  setPosition() {
    const leftDistance = config.playerSize * this.positionX;
    const rightDistance = config.playerSize * this.positionY;
    this.style.left = leftDistance;
    this.style.top = rightDistance;
  }
  changePosition() {
    setTimeout(() => {
      store.dispatch(this.enemyActions.moveEnemy(this.id));
      this.style.left = Number.parseInt(this.style.left, 10) + 30;
      this.style.top = Number.parseInt(this.style.top, 10) + 30;
      // this.changePosition();
    }, 1000);
  }
}
