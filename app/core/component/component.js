export default class Component {
  constructor(config) {
    this.config = config;
    const root = document.querySelector('root-component').shadowRoot;
    this.target = root.querySelector(config.tagName);

    // this.inputList = Array.prototype.slice.call(this.target) || target;
    console.log(this.target);
    this.insertInDom();
  }

  insertInDom() {
    // if(this.inputList) {
    //   this.inputList.forEach(
    //     (el) => {
    //       el.attachShadow({mode: 'open'})
    //         .innerHTML = `${this.config.template}<style>${this.config.styles ? this.config.styles : ''}</style>`;
    //     }
    //   );
    // } else {
    //   console.log
      this.target.attachShadow({mode: 'open'})
        .innerHTML = `${this.config.template}<style>${this.config.styles ? this.config.styles : ''}</style>`;
    }
  // }
}