import {Types,clone} from 'store';

const initialState = {
    today: [],
    past: [],
};

function isToday(item) {
    if (!item.done) {
        return true;
    }
    const dateObj = item.date ? item.date.toDate() : new Date();
    return dateObj.toDateString() === (new Date()).toDateString();
}

const ListReducer = (state, action) => {
    if (state === undefined) {
        return clone(initialState);
    }

    switch (action.type) {
        case Types.list.SYNCING_LIST:
            return state;
        case Types.list.SYNCED_LIST:
            return {
                ...clone(state),
                today: [
                    ...action.list.filter(item => isToday(item)),
                ],
                past: Object.entries(action.list.filter(item => !isToday(item)).reduce((carry, item) => {
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
