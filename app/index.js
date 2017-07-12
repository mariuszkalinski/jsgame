import {
  createStore
} from 'redux'
import {
  combineReducers
} from 'redux';
import root from './components/root/root';
import player from './components/player/player';
import playerState from './reducers/player.reducer';

const rootReducer = combineReducers({
  playerState,
});
let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;