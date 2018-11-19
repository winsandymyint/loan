import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import { error } from 'utils/message'
import { haveRequiredRoles } from 'utils/roles'
import { translate } from 'utils/translation'

const propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
    requiredRoles: PropTypes.array,
    user: PropTypes.object
}

class AccessControl extends Component {
    componentWillReceiveProps = nextProps => {
        const { user } = nextProps

        if (!this.isAuthorized(user) && !isEmpty(user)) {
            error(translate('AUTH_ACL_ERROR'))
        }
    }

    isAuthorized = user => {
        const { location, requiredRoles } = this.props

        if (location.pathname === '/') {
            return true
        }
        return haveRequiredRoles(requiredRoles, user)
    }

    render() {
        const { user } = this.props
        if (!this.isAuthorized(user)) {
            return null
        }
        return React.cloneElement(this.props.children)
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

AccessControl.propTypes = propTypes
export default connect(mapStateToProps)(withRouter(AccessControl))
