import {clone} from 'src/helpers/stateHelpers';
import {Types} from './authActions';

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
        case Types.LOGGING_IN:
        case Types.LOGGING_OUT:
            return {
                ...clone(state),
                loading: true,
            };
        case Types.LOGGED_IN:
            return {
                ...clone(state),
                loading: false,
                loggedIn: true,
            };
        case Types.LOGGED_OUT:
            return {
                ...clone(state),
                loading: false,
                loggedIn: false,
            };
        case Types.SYNCED_USER:
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
