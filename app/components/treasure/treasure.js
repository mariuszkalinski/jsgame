export default class Treasure extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <style>
        .treasure {
          width:10px;
          height:10px;
          position:absolute;
          display: inline-block;
          background: gray;
        }
      </style>
      <div class="treasure"></div>
    `;
  }
}
