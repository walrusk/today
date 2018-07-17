import {typesObj} from 'src/helpers/actionHelpers';

export const Types = Object.freeze({
    ...typesObj([
        'SYNC_ERROR',
    ]),
});

export const Actions = {
    syncError: (error) => {
        console.log(error);
        return {
            type: Types.REQUEST_ERROR,
        };
    },
};
