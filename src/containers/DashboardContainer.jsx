import React, { Component } from "react"
import { connect } from "react-redux"
import { login as loginAction } from "../actions"
import Dashboard from "../components/dashboard"

class DashboardContainer extends Component {
  render() {
    return <Dashboard {...this.props} />
  }
}

const mapStateToProps = state => ({
  user: state.auth.user ? state.auth.user : null,
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => {
    dispatch(loginAction(email, password))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer)
