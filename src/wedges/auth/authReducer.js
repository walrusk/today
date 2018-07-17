import {Types,clone} from 'store';

const initialState = {
    loading: false,
    loggedIn: false,
    user: null,
};

const AuthReducer = (state, action) => {
    if (state === undefined) {
        return clone(initialState);
    }

    switch (action.type) {
        case Types.auth.LOGGING_IN:
        case Types.auth.LOGGING_OUT:
            return {
                ...clone(state),
                loading: true,
            };
        case Types.auth.LOGGED_IN:
            return {
                ...clone(state),
                loading: false,
                loggedIn: true,
            };
        case Types.auth.LOGGED_OUT:
            return {
                ...clone(state),
                loading: false,
                loggedIn: false,
            };
        case Types.auth.SYNCED_USER:
            return {
                ...clone(state),
                loggedIn: action.user !== null,
                user: action.user,
                loading: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;
