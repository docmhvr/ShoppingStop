import { createStore } from 'redux';
import rootReducers from './reducers/reducer'

const store = createStore(rootReducers);

export default store;