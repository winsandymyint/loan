import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'

import LocaleProvider from 'antd/lib/locale-provider'
import enUS from 'antd/lib/locale-provider/en_US'

import AppRoutes from './AppRoutes'
import store from './store'
import { configureFakeBackend } from './helpers/fake-backend';
configureFakeBackend();

const renderApp = Component => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <LocaleProvider locale={enUS}>
                    <Component />
                </LocaleProvider>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

renderApp(AppRoutes)

serviceWorker.unregister();
