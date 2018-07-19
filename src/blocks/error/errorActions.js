import {typesObj} from 'store/helpers';

export const Types = Object.freeze({
    ...typesObj([
        'SYNC_ERROR',
    ]),
});

export const Actions = {
    syncError: (error) => {
        console.log(error);
        return {
            type: Types.SYNC_ERROR,
        };
    },
};
