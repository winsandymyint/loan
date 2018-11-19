import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from './types'
import { userService } from '../services'

const login = (email, password) => {
    return dispatch => {
        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user))
                },
                error => {
                    console.log('error')
                }
            )
    }

    function success(user) { return { type: LOGIN_SUCCESS, user } }
}

const register = (name, email, password, loanType, amount) => {
    return dispatch => {
        userService.register(name, email, password, loanType, amount)
            .then(
                users => {
                    dispatch(success(users))
                },
                error => {
                    console.log('error')
                }
            )
    }

    function success(user) { return { type: REGISTER_SUCCESS, user } }
}

const logout = () => {
  return { type: LOGOUT_SUCCESS }
}

export { login, logout, register }
