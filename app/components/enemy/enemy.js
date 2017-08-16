import Rx from 'rxjs';
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
    this.emitPositionChange();
    store.subscribe(this.mapToStore.bind(this));
  }
  mapToStore() {
    Rx.Observable.from(store.getState().enemyState)
      .filter(x => x.id === this.id)
      .distinctUntilChanged()
      .subscribe((x) => {
        this.style.left = x.x * config.playerSize;
        this.style.top = x.y * config.playerSize;
      });
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
  emitPositionChange() {
    setTimeout(() => {
      const treesState = store.getState().treeState;
      const treasureState = store.getState().treasureState;
      store.dispatch(this.enemyActions.moveEnemy(this.id, treesState, treasureState));
      this.emitPositionChange();
    }, 1000);
  }
}
