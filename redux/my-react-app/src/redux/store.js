import { legacy_createStore as createStore, } from 'redux'
import counterReducer from './counterReducer/reducer'


// create store

const store = createStore(counterReducer);




export default store;