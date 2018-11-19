import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Layout extends Component {
    render() {
        const { children } = this.props

        return (
            <div className='layout'>
                {children}
            </div>
        )
    }
}

Layout.propTypes = {
    children: PropTypes.node,
    retrieveInitData: PropTypes.func
}

export default process.env.NODE_ENV === 'development' ? Layout : Layout
