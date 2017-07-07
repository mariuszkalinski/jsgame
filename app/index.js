import Component from './core/component';

import styles from './styles.useable.scss';

const thing = new Component({
  tagName: 'app-init',
  template: `
    <p><span>!</span>Hello shadowDom</p>
    <grid></grid>
  `,
  styles: styles,
});