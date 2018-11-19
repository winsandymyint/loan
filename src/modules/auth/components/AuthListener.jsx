import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { actions } from 'appActions'
import { firebaseAuth } from 'utils/firebase'
import storage, { tokenName } from 'utils/storage'
import { error, success } from 'utils/message'
import { translate } from 'utils/translation'

class AuthListener extends Component {
    componentWillMount = () => {
        const { getCurrentUser, history, retrieveInitData } = this.props

        firebaseAuth.onIdTokenChanged(user => {
            if (user) {
                return user
                    .getIdToken()
                    .then(token => storage.set(tokenName, token))
                    .then(() => {
                        getCurrentUser()
                        retrieveInitData()
                    })
            } else {
                storage.remove(tokenName)
                history.push('/login')
            }
        })
    }

    componentWillReceiveProps = nextProps => {
        const { history, logout } = this.props
        const { errorObject, isLoadingLogin, isLoadingLogout, user } = nextProps

        if (this.props.isLoadingLogin !== isLoadingLogin && !isLoadingLogin) {
            if (isEmpty(user) && errorObject) {
                error(errorObject.message)
            }
            if (!isEmpty(user) && !errorObject) {
                // logout user if it's not admin
                const roles = (user.roles || []).filter(role => role.id === 'adm')
                if (roles.length === 0) {
                    error('Invalid user role')
                    return logout()
                }
                success(translate('AUTH_LOGIN_SUCCESS'))
                history.push('/')
            }
        }
        if (this.props.isLoadingLogout !== isLoadingLogout && !isLoadingLogout) {
            if (isEmpty(user) && !errorObject) {
                success(translate('AUTH_LOGOUT_SUCCESS'))
                storage.remove(tokenName)
                history.push('/login')
            }
        }
    }

    render() {
        return React.cloneElement(this.props.children)
    }
}

const mapStateToProps = state => ({
    errorObject: state.auth.error,
    isLoadingLogin: state.auth.isLoadingLogin,
    isLoadingLogout: state.auth.isLoadingLogout,
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(actions.AUTH.LOGOUT())
    },
    getCurrentUser: () => {
        dispatch(actions.AUTH.GET_CURRENT_USER())
    },
    retrieveInitData: () => {
        dispatch(actions.SETTING.RETRIEVE_INIT_DATA())
    }
})

AuthListener.propTypes = {
    children: PropTypes.node,
    errorObject: PropTypes.object,
    getCurrentUser: PropTypes.func,
    history: PropTypes.object,
    isLoadingLogin: PropTypes.bool,
    isLoadingLogout: PropTypes.bool,
    logout: PropTypes.func,
    retrieveInitData: PropTypes.func,
    user: PropTypes.object
}

const ConnectedAuthListener = connect(mapStateToProps, mapDispatchToProps)(AuthListener)

export default withRouter(ConnectedAuthListener)
