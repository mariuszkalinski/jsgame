import '@webcomponents/shadydom';
export default class RootComponent {
  constructor(config) {
    this.config = config;
    this.target = document.getElementsByTagName(config.tagName);
    this.inputList = Array.prototype.slice.call(this.target);
    this.insertInDom();
    if (this.config.controller) this.config.controller(this);

  }

  insertInDom() {
    this.inputList.forEach(
      (el) => {
        el.attachShadow({
            mode: 'open'
          })
          .innerHTML += `${this.config.template}<style>${this.config.styles ? this.config.styles : ''}</style>`;
      }
    );
  }
}