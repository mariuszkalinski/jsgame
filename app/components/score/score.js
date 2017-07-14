// import config from '../../gameConfig/gameConfig';
import styles from './score.scss';
import store from '../../index';

export default class Score extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        ${styles}
      </style>
      <div>0</div>
    `;
    store.subscribe(this.mapToStore.bind(this));
  }
  mapToStore() {
    const score = store.getState().scoreState;
    this.shadowRoot.querySelector('div').innerHTML = score.score;
  }
}
