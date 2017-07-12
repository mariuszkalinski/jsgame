import Component from '../../core/component/component';
import styles from './tree.scss';
import {
  config
} from '../../gameConfig/gameConfig';
export default new Component({
  tagName: 'base-tree',
  template: `<div></div>`,
  styles,
  controller: (scope) => {
    const target = scope.target;
    target.style.width = config.playerSize;
    target.style.height = config.playerSize;
  }
})