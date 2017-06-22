import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// The following modules SHOULD be removed in production, as they are not used.
import { createLogger } from 'redux-logger';
import immutable from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

export const reducer = (state = '', action) => {
    return state === 'foo' ? 'bar' : 'foo';
};

export const someAction = () => ({ type: 'TEST_ACTION' });

export const configureStore = () => {
    let composeEnhancers;
    let middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middleware = [
            immutable(),
            ...middleware,
            createLogger({ level: 'info', collapsed: true })
        ];
        composeEnhancers = composeWithDevTools({});
    } else {
        composeEnhancers = compose;
    }

    return createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
};
