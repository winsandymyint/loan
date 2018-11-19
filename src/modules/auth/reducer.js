import { actionTypes } from 'appActions'

const defaultState = {
    error: null,
    isForgotPasswordSent: false,
    isLoadingForgotPassword: false,
    isLoadingLogin: false,
    isLoadingLogout: false,
    user: {}
}

function authReducer(state = defaultState, action) {
    switch (action.type) {
        case actionTypes.AUTH.CLEAR_CURRENT_USER:
            return {
                ...state,
                user: {}
            }

        case actionTypes.AUTH.LOGIN:
        case actionTypes.AUTH.LOGIN_WITH_GOOGLE:
            return {
                ...state,
                error: null,
                isLoadingLogin: true
            }

        case actionTypes.AUTH.LOGOUT:
            return {
                ...state,
                error: null,
                isLoadingLogout: true
            }

        case actionTypes.AUTH.SET_CURRENT_USER:
            return {
                ...state,
                isLoadingLogin: false,
                user: action.user
            }

        case actionTypes.AUTH.SET_ERROR:
            return {
                ...state,
                error: action.error,
                isLoadingLogout: false,
                isLoadingLogin: false,
                isLoadingForgotPassword: false
            }

        case actionTypes.AUTH.FORGOT_PASSWORD:
            return {
                ...state,
                error: null,
                isForgotPasswordSent: false,
                isLoadingForgotPassword: true
            }

        case actionTypes.AUTH.SET_FORGOT_PASSWORD:
            return {
                ...state,
                isForgotPasswordSent: action.status,
                isLoadingForgotPassword: false
            }

        default:
            return state
    }
}

export { authReducer, defaultState }
