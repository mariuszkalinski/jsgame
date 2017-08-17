import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/custom-elements';
import '@webcomponents/shadydom';

import { createStore, combineReducers } from 'redux';
import Root from './components/root/root';
import Tree from './components/tree/tree';
import Player from './components/player/player';
import Treasure from './components/treasure/treasure';
import Score from './components/score/score';
import Enemy from './components/enemy/enemy';

import playerState from './reducers/player.reducer';
import treeState from './reducers/tree.reducer';
import treasureState from './reducers/treasure.reducer';
import scoreState from './reducers/score.reducer';
import { enemyState } from './reducers/enemy.reducer';

const rootReducer = combineReducers({
  playerState,
  treeState,
  treasureState,
  scoreState,
  enemyState,
});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;
customElements.define('root-component', Root);
customElements.define('treasure-box', Treasure);
customElements.define('base-player', Player);
customElements.define('base-tree', Tree);
customElements.define('base-score', Score);
customElements.define('enemy-mob', Enemy);
