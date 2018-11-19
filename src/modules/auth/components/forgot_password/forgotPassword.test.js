/* global test expect shallow */

import React from 'react'
import ForgotPassword from './ForgotPassword'

test('component matches snapshot', () => {
    const wrapper = shallow(<ForgotPassword handleSubmit={() => undefined} />)
    expect(wrapper).toMatchSnapshot()
})

test('render props not in root node', () => {
    const wrapper = shallow(<ForgotPassword handleSubmit={() => undefined} isLoading />)
    expect(wrapper.instance().props).toHaveProperty('isLoading', true)
})
