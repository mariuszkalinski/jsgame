import Component from './core/component';
const styles = require('./styles.scss');
console.log(styles);
const thing = new Component({
  tagName: 'app-init',
  template: '<p><span>!</span>siema Modeczko</p>',
  styles: styles,
});