import RootComponent from './core/component/root';
import Component from './core/component/component';
// import RootComponent from './core/component';

import styles from './styles.useable.scss';

const grid = new RootComponent({
  tagName: 'root-component',
  template: `
    <base-player>
    </base-player>
  `,
  styles: styles,
});

const player = new Component({
  tagName: 'base-player',
  template: `
    <p><span>!</span>Hello player</p>
    <base-head class="head"></base-head>
  `,
  // styles: styles,
});

const head = new Component({
  tagName: 'base-head',
  template: `
    <p><span>!</span>Hello head</p>
  `,
  // styles: styles,
});