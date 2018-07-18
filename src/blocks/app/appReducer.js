import {Types,clone} from 'store';

const initialState = {
    online: true,
    initialLoad: true,
    loading: false,
    syncing: false,
    syncWaiting: false,
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
