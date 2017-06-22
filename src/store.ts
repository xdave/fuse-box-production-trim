import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const reducer = (state = '', action) => {
    return state === 'foo' ? 'bar' : 'foo';
};

export const someAction = () => ({ type: 'TEST_ACTION' });

export const configureStore = () => {
    let composeEnhancers;
    let middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        // DEVELOPMENT

        // The following modules SHOULD be removed in production, as they are not used.
        const { createLogger } = require('redux-logger');
        const immutable = require('redux-immutable-state-invariant').default;
        const { composeWithDevTools } = require('redux-devtools-extension');

        middleware = [
            immutable(),
            ...middleware,
            createLogger({ level: 'info', collapsed: true })
        ];
        composeEnhancers = composeWithDevTools({});
    } else {
        // PRODUCTION
        composeEnhancers = compose;
    }

    return createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
};
