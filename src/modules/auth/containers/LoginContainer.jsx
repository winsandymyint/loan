import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions } from 'appActions'
import Login from '../components/login'

class LoginContainer extends Component {
    render() {
        return <Login {...this.props} />
    }
}

const mapStateToProps = state => ({
    isLoadingLogin: state.auth.isLoadingLogin
})

const mapDispatchToProps = dispatch => ({
    login: (email, password) => {
        dispatch(actions.AUTH.LOGIN(email, password))
    },
    loginWithGoogle: () => {
        dispatch(actions.AUTH.LOGIN_WITH_GOOGLE())
    }
})

const LoginForm = reduxForm({
    form: 'login'
})(LoginContainer)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
