import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import storage from './storage'

class AuthRequired extends Component {
    componentWillMount = () => {
        const { history } = this.props
        if (!storage.isAuthenticated()) {
            history.push('/register')
        }
        else {
            history.push('/dashboard')
        }
    }

    render() {
        if (!storage.isAuthenticated()) {
            return null
        }
        return React.cloneElement(this.props.children)
    }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

AuthRequired.propTypes = {
    children: PropTypes.node,
    getCurrentUser: PropTypes.func,
    history: PropTypes.object,
    user: PropTypes.object
}

const ConnectedAuthRequired = connect(mapStateToProps)(AuthRequired)

export default withRouter(ConnectedAuthRequired)
