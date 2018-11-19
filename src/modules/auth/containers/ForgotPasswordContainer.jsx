import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { actions } from 'appActions'
import ForgotPassword from '../components/forgot_password'

class ForgotPasswordContainer extends Component {
    render() {
        return <ForgotPassword {...this.props} />
    }
}

const mapStateToProps = state => ({
    errorObject: state.auth.error,
    isForgotPasswordSent: state.auth.isForgotPasswordSent,
    isLoadingForgotPassword: state.auth.isLoadingForgotPassword
})

const mapDispatchToProps = dispatch => ({
    forgotPassword: email => {
        dispatch(actions.AUTH.FORGOT_PASSWORD(email))
    }
})

const ForgotPasswordForm = reduxForm({
    form: 'forgotPassword'
})(ForgotPasswordContainer)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm)
