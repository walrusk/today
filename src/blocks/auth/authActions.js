import {createActionCreatorGroup} from 'store/actionHelpers';

const {Types: SimpleTypes, Actions: SimpleActions} = createActionCreatorGroup({
    login: [],
    loggingIn: [],
    loggedIn: ['data'],
    loginError: ['error'],

    logout: [],
    loggingOut: [],
    loggedOut: ['data'],
    logoutError: ['error'],
    
    syncedUser: ['user'],
});

export const Types = Object.freeze({
    ...SimpleTypes,
});

export const Actions = {
    ...SimpleActions,
};
