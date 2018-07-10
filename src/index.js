import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from 'src/store/configureStore';
import App from './App';
//import registerServiceWorker from './registerServiceWorker';

import 'src/styles/index.less';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);

//registerServiceWorker();
