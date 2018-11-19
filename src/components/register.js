import React, { Component } from 'react'
import {Row, Col, Form, Input, Button, Select, InputNumber } from 'antd'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { message as AntdMessage } from 'antd'
import noop from 'lodash/noop'

const FormItem = Form.Item
const Option = Select.Option

const triggerMessage = (type, content = '[ no content ]', duration = 3, onClose = noop) =>
    AntdMessage[type](content, duration, onClose)
const success = content => triggerMessage('success', content)

class Register extends Component {
    componentWillReceiveProps = (nextProps) => {
      if (nextProps.message) {
        success(nextProps.message)
        this.props.history.push('/login')
      }
    }

    handleFormSubmit = values => {
      const { name, email, password, loanType, amount } = values
      this.props.register(name, email, password, loanType, amount)
    }

    render() {
        return (
            <Row align='middle' className='login' justify='center' type='flex'>
              <Col span={12}>
                <WrappedNormalRegisterForm onSubmit={this.handleFormSubmit} />
              </Col>
            </Row>
        )
    }
}

class RegisterForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Form onSubmit={this.handleSubmit} className='register-form'>
        <h2 className='form-header'>Get a business loan in 24 hours</h2>
        <FormItem
          {...formItemLayout}
          label='Name'
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input placeholder='Name' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Email'
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input placeholder='Email' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Password'
          >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Loan Type'
          hasFeedback
        >
          {getFieldDecorator('loanType', {
            rules: [
              { required: true, message: 'Please select your loan type!' },
            ],
          })(
            <Select placeholder='Please select a loan type'>
              <Option value='personal'>Personal Loan</Option>
              <Option value='business'>Business</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label='Amount'
        >
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: 'Please input your required loan amount!' }],
          })(
            <InputNumber
              initialValue={1000}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          )}
        </FormItem>
        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type='primary' htmlType='submit' className='register-form-button'>Register</Button>
          <div style={{ width: '100%' }}>Or <NavLink to='/login'>
              Login now!
            </NavLink>
          </div>
        </FormItem>
      </Form>
    )
  }
}

const WrappedNormalRegisterForm = Form.create()(RegisterForm)

Register.propTypes = {
    handleSubmit: PropTypes.func,
    history: PropTypes.object,
}
export default Register
