import {
  createStore,
  combineReducers,
} from 'redux';
import './components/root/root';
import './components/tree/tree';
import './components/player/player';

import playerState from './reducers/player.reducer';

const rootReducer = combineReducers({
  playerState,
});
const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
