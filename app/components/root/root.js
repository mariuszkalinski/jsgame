import RootComponent from '../../core/component/root';
import styles from '../../styles.useable.scss';
const grid = new RootComponent({
  tagName: 'root-component',
  template: `
    <base-player>
    </base-player>
  `,
  styles: styles,

});