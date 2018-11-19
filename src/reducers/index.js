import { combineReducers } from 'redux';
import auth from './auth-reducer';
/**
 * [rootReducer this method combines all the reducers and returns one reducer]
 *
 */
const rootReducer = combineReducers({ auth });
export default rootReducer;
