import React, { Component } from 'react'
import {Form, Button, InputNumber, Row, Col } from 'antd'

const FormItem = Form.Item

class RepayForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      totalWeeks : '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, value) => {
      if (!err) {
        const { loanUser } = this.props
        const weeklyAmount = value.weeklyAmount
        loanUser.weeklyAmount = weeklyAmount
        this.props.onSubmit(loanUser)
      }
    })
  }

  handleChange = (value) => {
    const { loanUser } = this.props
    const { amount } = loanUser
    const totalWeeks = Math.ceil(amount/value)
    this.setState({ totalWeeks })
  }

  render() {
    const { loanUser } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Row align='middle' className='login' justify='center' type='flex'>
        <Col span={12}>
          <Form onSubmit={this.handleSubmit} className="register-form">
            <h2 className="form-header">Your loan application approved</h2>
            <FormItem
              {...formItemLayout}
              label="Weekly Payment"
            >
              {getFieldDecorator('weeklyAmount', {
                rules: [{ required: true, message: 'Please input your weekly payment amount!' }],
              })(
                <InputNumber
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={this.handleChange}
                />
              )}
            </FormItem>
            <FormItem
              wrapperCol={{ span: 12, offset: 6 }}
            >
              <Button type="primary" htmlType="submit" className="register-form-button">{loanUser.weeklyAmount ? 'Update Amount' : 'Submit' }</Button>
            </FormItem>
            {this.state.totalWeeks &&
                <FormItem
                  wrapperCol={{ span: 12, offset: 6 }}
                >
                  <span>Need to pay {this.state.totalWeeks} weeks</span>
                </FormItem>
            }
          </Form>
        </Col>
      </Row>
    )
  }
}

const WrappedNormalRepayForm = Form.create()(RepayForm)
export default WrappedNormalRepayForm
