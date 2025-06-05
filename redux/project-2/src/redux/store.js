import rootReducer from './reducers/rootReducer';
import { legacy_createStore as createStore, } from 'redux'

const store=createStore(rootReducer);

export default store;