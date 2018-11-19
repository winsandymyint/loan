import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button, Icon, ReduxFormInput } from 'components'
import { email, required } from 'utils/formValidation'
import { success } from 'utils/message'
import { translate } from 'utils/translation'
import logoFull from 'assets/images/logo-full.png'

class ForgotPassword extends Component {
    componentWillReceiveProps = nextProps => {
        const { errorObject, isForgotPasswordSent, isLoadingForgotPassword } = nextProps

        if (this.props.isLoadingForgotPassword !== isLoadingForgotPassword && !isLoadingForgotPassword) {
            if (!errorObject && isForgotPasswordSent) {
                success(translate('AUTH_RESET_PASSWORD_SUCCESS'))
            }
        }
    }

    handleFormSubmit = ({ email }) => {
        this.props.forgotPassword(email)
    }

    handleGoBack = () => {
        this.props.history.push('/login')
    }

    render() {
        const { handleSubmit, isLoadingForgotPassword } = this.props

        return (
            <section className='forgot-password'>
                <form className='forgot-password-form' onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <div className='img-container'>
                        <img src={logoFull} />
                    </div>
                    <Field
                        component={ReduxFormInput}
                        name='email'
                        props={{
                            disabled: isLoadingForgotPassword,
                            placeholder: translate('INPUT_EMAIL_PLACEHOLDER'),
                            prefix: <Icon type='mail' />,
                            type: 'email'
                        }}
                        validate={[required, email]}
                    />
                    <div className='btn-container'>
                        <Button
                            htmlType='submit'
                            icon='retweet'
                            loading={isLoadingForgotPassword}
                            name='login-btn'
                            type='primary'
                            value={translate('AUTH_RESET_PASSWORD_TEXT')}
                        />
                    </div>
                    <div className='btn-container'>
                        <Button
                            ghost
                            icon='left'
                            name='go-back-btn'
                            onClick={this.handleGoBack}
                            type='primary'
                            value={translate('GENERAL_RETURN_TEXT')}
                        />
                    </div>
                </form>
            </section>
        )
    }
}

ForgotPassword.propTypes = {
    errorObject: PropTypes.object,
    forgotPassword: PropTypes.func,
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    isForgotPasswordSent: PropTypes.bool,
    isLoadingForgotPassword: PropTypes.bool
}
export default ForgotPassword
