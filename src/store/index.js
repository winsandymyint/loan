import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const loggerMiddleware = createLogger();
let store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(reduxThunk, loggerMiddleware))
)

export default store;
