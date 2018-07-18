import {createActionCreatorGroup} from 'store/actionHelpers';

const {Types: SimpleTypes, Actions: SimpleActions} = createActionCreatorGroup({
    // addPoint: [],
    // deletePoint: ['id'],
    // deletePoints: ['ids'],
    // updatePoint: ['point', 'buffer'],
    // updatingPoint: ['id'],
    // updatedPoint: ['id'],
    // updatePoints: ['points'],
    // updatingPoints: ['ids'],
    // updatedPoints: ['ids'],
    // changedPoint: ['id'],
    syncingPoint: ['id'],
    syncedTodos: ['point'],
    canceledSyncPoint: ['id'],
});

export const Types = Object.freeze({
    ...SimpleTypes,
});

export const Actions = {
    ...SimpleActions,
};
