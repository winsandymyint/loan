import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../actions/types';
import storage from '../helpers/storage'

export const initialState = {
  user: storage.get('user') ? JSON.parse(storage.get('user')) : null
};

/**
 * [dataReducer this method is responsible for updating the state for data]
 * @param  {[Object]} state  [inital state object]
 * @param  {[Object]} action [current dispatched action]
 * @return {[String]}        [type of dispatched action]
 */
export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.user };
    case LOGOUT_SUCCESS:
      return {...state, user: {}};
    case REGISTER_SUCCESS:
      return {...state, message: 'Register Success'};
    default:
      return state;
  }
}
