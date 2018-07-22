import firebase from 'firebase';
import {
    fork, take, call, cancel, takeLatest,
    takeEvery, cancelled, select, put,
} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import pick from 'lodash/pick';
import rsf from 'src/store/base';
import {Selectors,ActionCreators as Actions,Types} from 'store';

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
    item: item => pick(item, ['owner', 'name', 'done', 'date']),
};

const Queries = {
    syncList: (owner) => {
        return call(
            rsf.firestore.syncCollection,
            firebase.firestore().collection('list')
                .where('owner', '==', owner)
                .orderBy('done')
                .orderBy('date', 'desc')
                .limit(200),
            {
                successActionCreator: Actions.list.syncedList,
                failureActionCreator: Actions.error.syncError,
                transform: Transformers.list
            }
        );
    },
    updateItem: (owner, {id, ...item}) => {
        return call(
            rsf.firestore.updateDocument,
            `list/${id}`,
            Filters.item({
                ...item,
                owner,
            }),
        );
    },
    addItem: (owner, item) => {
        return call(
            rsf.firestore.addDocument,
            'list',
            Filters.item({
                ...item,
                owner,
            }),
        );
    },
    deleteItem: (id) => {
        return call(
            rsf.firestore.deleteDocument,
            `list/${id}`,
        );
    },
};

function * addItem({item}) {
    const owner = yield select(Selectors.auth.owner);
    yield Queries.addItem(owner, item);
}

function * updateItem({item, buffer = 0}) {
    if (buffer > 0) {
        yield delay(buffer);
    }
    const owner = yield select(Selectors.auth.owner);
    yield put(Actions.list.updatingItem(item.id));
    yield Queries.updateItem(owner, item);
    yield put(Actions.list.updatedItem(item.id));
}

function * deleteItem({id}) {
    yield Queries.deleteItem(id);
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
    function * () { yield takeEvery(Types.list.ADD_ITEM, addItem); },
    function * () { yield takeLatest(Types.list.UPDATE_ITEM, updateItem); },
    function * () { yield takeEvery(Types.list.DELETE_ITEM, deleteItem); },
    rootPointSaga,
];
