import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
//import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    sagaMiddleware,
];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension);
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
);

function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, composedEnhancers);
    //sagaMiddleware.run(rootSagas);
    return store;
}

export const store = configureStore();
export const dispatch = store.dispatch;
