import styles from '../../styles.useable.scss';
import store from '../../index';
import config from '../../gameConfig/gameConfig';
import treasureActions from '../../actions/treasure.actions';
import enemyActions from '../../actions/enemy.actions';

export default class Root extends HTMLElement {
  constructor() {
    super();
    this.store = store;
    this.treasureActions = treasureActions();
    this.enemyActions = enemyActions();
    this.shadowRoots = this.attachShadow({ mode: 'open' });
    this.shadowRoots.innerHTML = `
    <style>
      ${styles}
    </style>
    <base-player>
    </base-player>
    <base-score>
    </base-score>
    `;
    // this.generateTreasureState = generateTreasureState;
    this.style.width = config.gridSize.x;
    this.style.height = config.gridSize.y;

    this.generateTrees();
    const trees = this.store.getState().treeState;
    store.dispatch(this.treasureActions.generateTreasures(trees));
    store.dispatch(this.enemyActions.generateEnemies());
    this.generateTreasures();
    this.generateEnemies();
    // this.unsubscribe();

    this.unsubscribe = this.store.subscribe(this.mapStateToThis.bind(this));
    this.currentValue = {};
  }
  select(state) {
    return state.treasureState;
  }
  mapStateToThis() {
    const previousValue = this.currentValue;
    this.currentValue = this.select(this.store.getState());

    if (previousValue !== this.currentValue) {
      const treesNodes = this.shadowRoot.querySelectorAll('treasure-box');
      treesNodes.forEach((x) => {
        const nodeXPosition = parseInt(x.getAttribute('left'), 10);
        const nodeYPosition = parseInt(x.getAttribute('top'), 10);
        const playerPosition = this.store.getState().playerState;
        const ifPlayerColideWithTreasure = nodeXPosition === playerPosition.x && nodeYPosition === playerPosition.y;
        if (ifPlayerColideWithTreasure) {
          this.shadowRoot.removeChild(x);
        }
      });
    }
  }
  generateTrees() {
    const treesPositions = this.store.getState().treeState;
    treesPositions.forEach((val) => {
      const selectedTreeIndex = Math.floor(Math.random() * (config.treesTypes.length));
      const selectedTreeName = config.treesTypes[selectedTreeIndex];
      const tree = document.createElement('base-tree');
      tree.setAttribute('top', val.y);
      tree.setAttribute('left', val.x);
      tree.className = selectedTreeName;
      this.shadowRoots.appendChild(tree);
    }, this);
  }
  generateTreasures() {
    const treasuresPositions = this.store.getState().treasureState;
    treasuresPositions.forEach((val) => {
      const treasure = document.createElement('treasure-box');
      treasure.setAttribute('top', val.y);
      treasure.setAttribute('left', val.x);
      this.shadowRoots.appendChild(treasure);
    }, this);
  }
  generateEnemies() {
    const enemiesPositions = this.store.getState().enemyState;
    enemiesPositions.forEach((val) => {
      const enemy = document.createElement('enemy-mob');
      enemy.setAttribute('top', val.y);
      enemy.setAttribute('left', val.x);
      enemy.id = val.id;
      this.shadowRoots.appendChild(enemy);
    }, this);
  }
}
