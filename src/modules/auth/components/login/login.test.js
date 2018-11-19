/* global test expect shallow */

import React from 'react'
import Login from './Login'

test('component matches snapshot', () => {
    const wrapper = shallow(<Login handleSubmit={() => undefined} />)
    expect(wrapper).toMatchSnapshot()
})

test('render props not in root node', () => {
    const wrapper = shallow(<Login handleSubmit={() => undefined} isLoading />)
    expect(wrapper.instance().props).toHaveProperty('isLoading', true)
})
