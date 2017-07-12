import RootComponent from '../../core/component/root';
import styles from '../../styles.useable.scss';


const generateRootComponents = () => {
  return `
    <base-player><\base-player>
    <base-tree><\base-tree>
  `;
}
const grid = new RootComponent({
  tagName: 'root-component',
  template: generateRootComponents(),
  styles: styles,
});
// import tree from '../tree/tree';