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
        case Types.list.SYNCED_LIST:
            return {
                ...clone(state),
                loading: false,
                syncing: false,
            };
        case Types.list.UPDATE_ITEM:
            return {
                ...clone(state),
                syncWaiting: true,
            };
        case Types.list.ADD_ITEM:
        case Types.list.UPDATING_ITEM:
            return {
                ...clone(state),
                syncing: true,
                syncWaiting: false,
            };
        case Types.list.UPDATED_ITEM:
            return {
                ...clone(state),
                syncing: false,
            };
        default:
            return state;
    }
};

export default AppReducer;
