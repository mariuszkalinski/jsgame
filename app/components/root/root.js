import styles from '../../styles.useable.scss';

export default class Root extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
    <base-player>
    </base-player>
    <base-tree left="2" top="2">
    </base-tree>
    <style>
      ${styles}
    </style>
    `;
    this.generateTrees();
  }
  generateTrees() {
    const tree = document.createElement('base-tree');
    this.appendChild(tree);
  }
}
