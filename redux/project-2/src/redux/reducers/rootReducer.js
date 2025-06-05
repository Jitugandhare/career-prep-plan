import {combineReducers} from 'redux'
import counterReducer from '../reducers/counterReducer';
import authReducer from '../reducers/authReducer'
const rootReducer=combineReducers(
    {
        counter:counterReducer,
        auth: authReducer
    }
)

export default rootReducer;