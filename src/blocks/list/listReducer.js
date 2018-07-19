import {Types,clone} from 'store';

const initialState = {
    today: [],
    past: [],
};

const ListReducer = (state, action) => {
    if (state === undefined) {
        return clone(initialState);
    }

    switch (action.type) {
        case Types.list.SYNCED_LIST:
            return {
                ...clone(state),
                today: [
                    ...action.list.filter(item => !item.done),
                ],
                past: Object.entries(action.list.filter(item => item.done).reduce((carry, item) => {
                    const dateObj = item.date ? item.date.toDate() : new Date();
                    const stringDate = [
                        dateObj.getFullYear(),
                        dateObj.getMonth().toString().padStart(2, '0'),
                        dateObj.getDate()
                    ].join('-');

                    if (carry[stringDate] === undefined) {
                        carry[stringDate] = [];
                    }
                    carry[stringDate].push(item);
                    return carry;
                }, {})).map(([date, items]) => ({ date, items })).sort((a,b) => a.date < b.date),
            };

        default:
            return state;
    }
};

export default ListReducer;
