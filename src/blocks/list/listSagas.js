import firebase from 'firebase';
import {
    fork, take, call, cancel, takeLatest,
    cancelled, select, put,
} from 'redux-saga/effects';
import rsf from 'src/store/base';
import {Selectors,Actions,Types} from 'store';

const Transformers = {
    item: item => {
        const data = item.data();
        return {
            id: item.id,
            ...data,
        };
    },
    list: list => list.docs.map(item => Transformers.item(item)),
};

const Filters = {
    item: item => ({
        ...item,
        date: firebase.firestore.FieldValue.serverTimestamp(),
    }),
};

const Queries = {
    syncList: (owner) => {
        return call(
            rsf.firestore.syncCollection,
            firebase.firestore().collection('list')
                .where('owner', '==', owner),
            {
                successActionCreator: Actions.list.syncedList,
                failureActionCreator: Actions.error.syncError,
                transform: Transformers.list
            }
        );
    },
    updateItem: ({id, ...item}) => {
        return call(
            rsf.firestore.updateDocument,
            `list/${id}`,
            Filters.item(item),
        );
    },
};

function * updateItem({item}) {
    yield put(Actions.list.updatingItem(item.id));
    yield Queries.updateItem(item);
    yield put(Actions.list.updatedItem(item.id));
}

function * syncList() {
    const owner = yield select(Selectors.auth.owner);

    yield put(Actions.list.syncingList());

    try {
        yield Queries.syncList(owner);
    } catch (err) {
        console.log('syncList error', err);
    } finally {
        if (yield cancelled()) {
            yield put(Actions.list.canceledSyncList());
        }
    }
}

function * listWatch() {
    yield fork(syncList);
}

function * rootPointSaga() {
    let listWatchTask;
    while (true) {
        yield take(Types.auth.SYNCED_USER);
        const isLoggedIn = yield select(Selectors.auth.isLoggedIn);
        if (isLoggedIn) {
            listWatchTask = yield fork(listWatch);
        } else if (listWatchTask !== undefined) {
            yield cancel(listWatchTask);
        }
    }
}

export default [
    function * () { yield takeLatest(Types.list.UPDATE_ITEM, updateItem); },
    rootPointSaga,
];
