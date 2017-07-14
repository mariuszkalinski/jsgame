import styles from './tree.scss';
import config from '../../gameConfig/gameConfig';

export default class Tree extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open',
    });
    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div></div>
    `;
    this.positionX = this.getAttribute('left');
    this.positionY = this.getAttribute('top');
    this.setSize();
    this.setPosition();
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
}
