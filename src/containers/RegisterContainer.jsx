import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register as registerAction } from '../actions'
import Register from '../components/register'

class RegisterContainer extends Component {
    render() {
        return <Register {...this.props} />
    }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user ? state.auth.user : null,
    message: state.auth.message ? state.auth.message : null
  }
}

const mapDispatchToProps = dispatch => ({
    register: (name, email, password, loanType, amount) => {
        dispatch(registerAction(name, email, password, loanType, amount))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer)
