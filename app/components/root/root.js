import styles from '../../styles.useable.scss';
import store from '../../index';
import config from '../../gameConfig/gameConfig';

export default class Root extends HTMLElement {
  constructor() {
    super();
    this.shadowRoots = this.attachShadow({ mode: 'open' });
    this.shadowRoots.innerHTML = `
    <style>
      ${styles}
    </style>
    <base-player>
    </base-player>
    `;
    this.style.width = config.gridSize.x;
    this.style.height = config.gridSize.y;
    this.generateTrees();
  }
  generateTrees() {
    const treesPositions = store.getState().treeState;
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
}
