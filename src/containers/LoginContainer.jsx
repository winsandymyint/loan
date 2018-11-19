import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login as loginAction } from '../actions'
import Login from '../components/login'

class LoginContainer extends Component {
    render() {
        return <Login {...this.props} />
    }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user ? state.auth.user : null
  }
}

const mapDispatchToProps = dispatch => ({
    login: (email, password) => {
        dispatch(loginAction(email, password))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
