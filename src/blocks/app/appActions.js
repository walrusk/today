import {createActionCreatorGroup} from 'store/helpers';

const {Types: SimpleTypes, Actions: SimpleActions} = createActionCreatorGroup({
    appOffline: [],
    appOnline: [],
});

export const Types = Object.freeze({
    ...SimpleTypes,
    'LOCATION_CHANGE': '@@router/LOCATION_CHANGE',
});

export const Actions = {
    ...SimpleActions,
};
