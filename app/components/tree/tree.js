
import styles from './tree.scss';
import config from '../../gameConfig/gameConfig';

export default class Tree extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div></div>
    `;
    this.setSize();
  }
  setSize() {
    this.style.width = config.playerSize;
    this.style.height = config.playerSize;
  }
}
