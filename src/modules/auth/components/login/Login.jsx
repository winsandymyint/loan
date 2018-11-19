import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { Button, Col, Divider, Icon, Row, ReduxFormInput } from 'components'
import { email, required } from 'utils/formValidation'
import { translate } from 'utils/translation'
import storage from 'utils/storage'
import logoFull from 'assets/images/logo-full.png'

class Login extends Component {
    componentWillMount = () => {
        const { history } = this.props

        if (storage.isAuthenticated()) {
            history.push('/')
        }
    }

    handleForgotPassword = () => {
        this.props.history.push('forgot-password')
    }

    handleFormSubmit = ({ email, password }) => {
        this.props.login(email, password)
    }

    handleGoogleFormSubmit = event => {
        event.preventDefault()
        this.props.loginWithGoogle()
    }

    render() {
        const { handleSubmit, isLoadingLogin } = this.props

        return (
            <Row align='middle' className='login' justify='center' type='flex'>
                <Col className='login__form' span={6}>
                    <form onSubmit={handleSubmit(this.handleFormSubmit)}>
                        <div className='login__form-image'>
                            <img src={logoFull} />
                        </div>
                        <Field
                            component={ReduxFormInput}
                            name='email'
                            props={{
                                autoComplete: 'email',
                                disabled: isLoadingLogin,
                                prefix: <Icon type='mail' />,
                                placeholder: translate('INPUT_EMAIL_PLACEHOLDER'),
                                type: 'email'
                            }}
                            validate={[required, email]}
                        />
                        <Field
                            component={ReduxFormInput}
                            name='password'
                            props={{
                                autoComplete: 'current-password',
                                prefix: <Icon type='key' />,
                                placeholder: translate('INPUT_PASSWORD_PLACEHOLDER'),
                                type: 'password'
                            }}
                            validate={required}
                        />
                        <div className='login__form-forgot-password'>
                            <span onClick={this.handleForgotPassword}>{translate('AUTH_FORGOT_PASSWORD_TEXT')}</span>
                        </div>
                        <div className='login__form-login-btn'>
                            <Button
                                htmlType='submit'
                                icon='login'
                                loading={isLoadingLogin}
                                name='login-btn'
                                type='primary'
                                value={translate('AUTH_LOGIN_TEXT')}
                            />
                        </div>
                    </form>
                    <Divider />
                    <div>
                        <Row className='login__form-social-login-btn' justify='space-around' type='flex'>
                            <Button
                                icon='google'
                                loading={isLoadingLogin}
                                name='login-btn'
                                onClick={this.handleGoogleFormSubmit}
                                value={translate('AUTH_LOGIN_GOOGLE_TEXT')}
                            />
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    isLoadingLogin: PropTypes.bool,
    login: PropTypes.func,
    loginWithGoogle: PropTypes.func,
    submitting: PropTypes.bool
}
export default Login
