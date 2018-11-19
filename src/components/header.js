import React, { Component } from 'react'
import { Layout, Menu, Icon, Row, Col } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout as logoutAction } from '../actions'

const AntdHeader = Layout.Header
const { SubMenu } = Menu

class Header extends Component {

    logoutUser = () => {
        this.props.logout()
    }

    render() {
        const { user } = this.props
        const userTitle = (
            <span>
                <Icon type='user' /> { user ? user.username : ''}
            </span>
        )

        return (
            <AntdHeader className='layout-header'>
                <Row align='middle' className='layout-header__container' justify='end' type='flex'>
                    <Col className='layout-header__brand' span={4}>
                        Aspire
                    </Col>
                    <Col offset={18} span={2}>
                        <Menu mode='horizontal'>
                            <SubMenu key='user' title={userTitle}>
                                <Menu.Item key='signout'>
                                    <div onClick={this.logoutUser}>Sign out</div>
                                </Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                </Row>
            </AntdHeader>
        )
    }
}

const mapStateToProps = state => {
  return {
      user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => {
      dispatch(logoutAction())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
