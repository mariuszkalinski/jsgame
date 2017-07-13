import '@webcomponents/custom-elements/src/native-shim';
import '@webcomponents/shadydom';


import { createStore, combineReducers } from 'redux';
import Root from './components/root/root';
import Tree from './components/tree/tree';
import Player from './components/player/player';
import Treasure from './components/treasure/treasure';

import playerState from './reducers/player.reducer';

const rootReducer = combineReducers({
  playerState,
});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
customElements.define('root-component', Root);
customElements.define('treasure-box', Treasure);
customElements.define('base-player', Player);
customElements.define('base-tree', Tree);
export default store;
