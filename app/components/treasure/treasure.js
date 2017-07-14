import config from '../../gameConfig/gameConfig';
import styles from './treasure.scss';

export default class Treasure extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div class="treasure"></div>
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
