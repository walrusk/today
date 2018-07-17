import {clone} from 'src/helpers/stateHelpers';
import Types from 'store/types';

const initialState = {
    online: true,
    initialLoad: true,
    loading: false,
    syncing: false,
    syncWaiting: false,
    today: [
        {id: 1, done: false, name: 'stuff to do'},
        {id: 2, done: false, name: 'other stuff to do'},
        {id: 3, done: false, name: 'more stuff to do'},
        {id: 4, done: false, name: 'even more stuff to do'},
        {id: 5, done: false, name: 'yet more stuff to do'}
    ],
    past: [
        { date: '2018-07-08', items: [
            {id: 6, done: true, name: 'stuff i did'},
            {id: 7, done: true, name: 'other stuff i did'},
        ] },
        { date: '2018-07-07', items: [
            {id: 8, done: true, name: 'more stuff i did'},
            {id: 9, done: true, name: 'even more other stuff i did'},
        ] },
        { date: '2018-07-06', items: [
            {id: 10, done: true, name: 'yet more stuff i did'},
            {id: 11, done: true, name: 'yet even other stuff i did'},
        ] }
    ],
};

const AppReducer = (state, action) => {
    if (state === undefined) {
        return clone(initialState);
    }

    switch (action.type) {
        case Types.app.APP_ONLINE:
            return {
                ...clone(state),
                online: true,
            };
        case Types.app.APP_OFFLINE:
            return {
                ...clone(state),
                online: false,
            };
        case Types.auth.SYNCED_USER:
            return state.initialLoad
                    ? { ...clone(state), initialLoad: false }
                    : state;
        default:
            return state;
    }
};

export default AppReducer;
