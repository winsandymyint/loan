export const actions = {
    CLEAR_CURRENT_USER(type) {
        return { type }
    },

    GET_CURRENT_USER(type) {
        return { type }
    },

    SET_CURRENT_USER(type, user) {
        return { type, user }
    },

    SET_ERROR(type, error) {
        return { type, error }
    },

    LOGIN(type, username, password) {
        return { type, username, password }
    },

    LOGOUT(type) {
        return { type }
    },

    LOGIN_WITH_GOOGLE(type) {
        return { type }
    },

    FORGOT_PASSWORD(type, email) {
        return { type, email }
    },

    SET_FORGOT_PASSWORD(type, status) {
        return { type, status }
    }
}
