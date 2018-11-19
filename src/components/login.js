import React, { Component } from 'react'
import {Row, Col, Form, Icon, Input, Button } from 'antd';
import PropTypes from 'prop-types'

const FormItem = Form.Item;

class Login extends Component {

    componentWillReceiveProps = (nextProps) => {
      const { user } = nextProps;
      if (user && user.id) {
        this.props.history.push('/')
      }
    }

    handleFormSubmit = (email, password) => {
        this.props.login(email, password)
    }

    render() {
        return (
            <Row align='middle' className='login' justify='center' type='flex'>
              <Col className='login__form' span={6}>
                <WrappedNormalLoginForm onSubmit={this.handleFormSubmit} />
              </Col>
            </Row>
        )
    }
}

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { email, password } = values
        this.props.onSubmit(email, password)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h2 className="form-header">Login</h2>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(LoginForm);

Login.propTypes = {
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
    isLoadingLogin: PropTypes.bool,
    login: PropTypes.func,
    submitting: PropTypes.bool
}
export default Login
