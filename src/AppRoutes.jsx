import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AuthRequired from './helpers/AuthRequired'
import Layout from './Layout'
import LoginContainer from './containers/LoginContainer'
import DashboardContainer from './containers/DashboardContainer'
import RegisterContainer from './containers/RegisterContainer'

const AuthRequiredContainer = () => (
    <AuthRequired>
      <Switch>
          <Route component={DashboardContainer} path='/dashboard'/>
      </Switch>
    </AuthRequired>
)

const AppRoutes = () => (
    <BrowserRouter>
      <Layout>
        <Switch>
            <Route component={LoginContainer} path='/login' />
            <Route component={RegisterContainer} path='/register' />
            <Route component={AuthRequiredContainer} path='/' />
        </Switch>
      </Layout>
    </BrowserRouter>
)

export default AppRoutes
