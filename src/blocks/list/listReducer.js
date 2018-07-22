import is from 'is_js';
import {keyPush} from 'src/helpers/jsHelpers';
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
    return is.today(dateObj);
}

function getStringDate(item) {
    const dateObj = item.date ? item.date.toDate() : new Date();
    if (is.yesterday(dateObj)) {
        return 'Yesterday';
    }

    if (is.inLastWeek(dateObj)) {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[dateObj.getDay()];
    }

    return [
        dateObj.getFullYear(),
        dateObj.getMonth().toString().padStart(2, '0'),
        dateObj.getDate()
    ].join('-');
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
                    return keyPush(carry, getStringDate(item), item);
                }, {})).map(([date, items]) => ({ date, items })).sort((a,b) => a.date < b.date),
            };

        default:
            return state;
    }
};

export default ListReducer;
