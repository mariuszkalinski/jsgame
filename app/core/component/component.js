import '@webcomponents/shadydom';
export default class Component {
  constructor(config) {
    this.config = config;
    this.root = document.querySelector('root-component').shadowRoot;
    this.target = this.root.querySelector(config.tagName);
    this.insertInDom();
    if (this.config.controller) this.config.controller(this);
  }

  insertInDom() {
    console.log(this.target);
    this.target.attachShadow({
        mode: 'open'
      })
      .innerHTML = `${this.config.template}<style>${this.config.styles ? this.config.styles : ''}</style>`;
  }

}