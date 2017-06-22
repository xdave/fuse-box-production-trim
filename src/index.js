const { createStore, compose, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

const reducer = (state, action) => {
    return state;
};

const configureStore = () => {
    let composeEnhancers;
    let middleware = [thunk];

    if (process.env.NODE_ENV !== 'production') {
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
        composeEnhancers = compose;
    }

    return createStore(reducer, composeEnhancers(applyMiddleware(middleware)));
};

const store = configureStore();
