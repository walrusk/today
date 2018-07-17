import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {store} from 'src/store/configureStore';
import AppContainer from '@/app/AppContainer';
//import registerServiceWorker from './registerServiceWorker';

import 'src/styles/index.less';

render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root'),
);

//registerServiceWorker();
