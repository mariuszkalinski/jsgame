export default class Component {
  constructor(config) {
    this.config = config;
    this.root = document.querySelector('root-component').shadowRoot;
    this.target = this.root.querySelector(config.tagName);
    this.insertInDom();
    if (this.config.controller) this.config.controller(this);
  }

  insertInDom() {
    this.target.attachShadow({
      mode: 'open',
    })
      .innerHTML = `${this.config.template}<style>${this.config.styles ? this.config.styles : ''}</style>`;
  }
}
// export default class Component extends HTMLElement {
//   constructor(config) {
//     super();
//     this.config = config;
//     const shadowRoot = this.attachShadow({ mode: 'open' });
//     if (this.config.controller) this.config.controller(this);
//     shadowRoot.innerHTML = `${this.config.template}<style>${this.config.styles ? this.config.styles : ''}</style>`;
//   }
// }
