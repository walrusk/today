import {createActionCreatorGroup} from 'store/helpers';

const {Types: SimpleTypes, Actions: SimpleActions} = createActionCreatorGroup({
    // addPoint: [],
    // deletePoint: ['id'],
    // deletePoints: ['ids'],
    updateItem: ['item'],
    updatingItem: ['id'],
    updatedItem: ['id'],
    syncingList: [],
    syncedList: ['list'],
    canceledSyncList: [],
});

export const Types = Object.freeze({
    ...SimpleTypes,
});

export const Actions = {
    ...SimpleActions,
};
