import {createActionCreatorGroup} from 'store/helpers';

const {Types: SimpleTypes, Actions: SimpleActions} = createActionCreatorGroup({
    addItem: ['item'],
    deleteItem: ['id'],
    updateItem: ['item', 'buffer'],
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
