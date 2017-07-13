import styles from '../../styles.useable.scss';
import store from '../../index';

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
    this.generateTrees();
  }
  generateTrees() {
    const treesPositions = store.getState().treeState;

    treesPositions.forEach((val) => {
      const tree = document.createElement('base-tree');
      tree.setAttribute('top', val.y);
      tree.setAttribute('left', val.x);
      this.shadowRoots.appendChild(tree);
    }, this);
  }
}
