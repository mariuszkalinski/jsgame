export default class Component {
  constructor(config) {
    this.config = config;
    this.target = document.getElementsByTagName(config.tagName);
    this.inputList = Array.prototype.slice.call(this.target);
    this.insertInDom();
  }

  insertInDom() {
    this.inputList.forEach(
      (el) => {
        el.attachShadow({mode: 'open'})
          .innerHTML = `${this.config.styles ? this.config.styles : ''} ${this.config.template}`;
      }
    );
  }
}