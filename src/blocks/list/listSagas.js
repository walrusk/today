import firebase from 'firebase';
import {
    fork, take, call, cancel,
    cancelled, select, put, actionChannel,
} from 'redux-saga/effects';
import {buffers, delay} from 'redux-saga';
import rsf from 'src/store/base';
import {arrayPick} from 'src/helpers/jsHelpers';
import omit from 'lodash/omit';

import {Selectors,Types} from 'store';
// import {Types, Actions} from '@/point/pointActions';
// import {Types as AuthTypes} from '@/auth/authActions';
import {Actions as ErrorActions} from '@/error/errorActions';

import {initialState as initialPoint} from '@/point/pointReducer';

const Selectors = {
    owner: state => state.auth.user.uid,
    isLoggedIn: state => state.auth.loggedIn,
    pointId: state => state.point._id,
    subs: state => state.point._subs,
};

const Transformers = {
    point: point => {
        const data = point.data();
        return {
            _id: point.id,
            ...data,
        };
    },
    points: points => points.docs.map(point => Transformers.point(point)),
    firstPoint: points => {
        return points.docs.length === 0
            ? { ...initialPoint }
            : points.docs.map(point => Transformers.point(point))[0];
    },
};

const Filters = {
    point: point => ({
        ...point,
        ...point._fields ? {
            _fields: arrayPick(point._fields, ['focus', 'meta', 'title', 'invisible']),
        } : {},
        _updated: firebase.firestore.FieldValue.serverTimestamp(),
    }),
};

const Queries = {
    syncPoint: (owner, pointId) => {
        const successActionCreator = Actions.syncedPoint;
        const failureActionCreator = ErrorActions.syncError;
        if (pointId === null) { // home
            return call(
                rsf.firestore.syncCollection,
                firebase.firestore().collection('points')
                                    .where('_owner', '==', owner)
                                    .where('_parent', '==', null)
                                    .limit(1),
                {successActionCreator, failureActionCreator, transform: Transformers.firstPoint}
            );
        } else {
            return call(
                rsf.firestore.syncDocument,
                firebase.firestore().collection('points').doc(pointId),
                {successActionCreator, failureActionCreator, transform: Transformers.point}
            );
        }
    },
    syncSubs: (owner, parentPointId) => {
        const parent = firebase.firestore().collection('points').doc(parentPointId);
        return call(
            rsf.firestore.syncCollection,
            firebase.firestore().collection('points')
                .where('_owner', '==', owner)
                .where('_parent', '==', parent)
                .orderBy('_sequence')
                .orderBy('_created', 'desc'),
            {
                successActionCreator: Actions.syncedSubs,
                failureActionCreator: ErrorActions.syncError,
                transform: Transformers.points,
            }
        );
    },
    addPoint: (owner, parentPointId) => {
        const parent = firebase.firestore().collection('points').doc(parentPointId);
        return call(
            rsf.firestore.addDocument,
            'points',
            omit({
               ...initialPoint,
               _created: firebase.firestore.FieldValue.serverTimestamp(),
               _updated: firebase.firestore.FieldValue.serverTimestamp(),
               _owner: owner,
               _parent: parent,
            }, ['_id', '_subs'])
        );
    },
    deletePoint: (pointId) => {
        return call(
            rsf.firestore.deleteDocument,
            `points/${pointId}`,
        );
    },
    deletePoints: (pointIds) => {
        let batch = firebase.firestore().batch();
        for (let i=0; i<pointIds.length; i++) {
            const id = pointIds[i];
            const doc = firebase.firestore().collection('points').doc(id);
            batch.delete(doc);
        }
        return batch.commit();
    },
    updatePoint: (point) => {
        const {_id, ...data} = point;
        return call(
            rsf.firestore.updateDocument,
            `points/${_id}`,
            Filters.point(data),
        );
    },
    updatePoints: (points) => {
        let batch = firebase.firestore().batch();
        for (let i=0; i<points.length; i++) {
            const {_id, ...data} = points[i];
            const doc = firebase.firestore().collection('points').doc(_id);
            batch.update(
                doc,
                Filters.point(data),
            );
        }
        return batch.commit();
    }
};

function * syncTodos() {
    const owner = yield select(Selectors.auth.owner);
    // let pointId = yield select(Selectors.pointId);
    
    //yield put(Actions.syncingPoint(pointId));

    try {
        yield Queries.syncTodos(owner);
    } catch (err) {
        console.log('syncPoint error', err);
    } finally {
        if (yield cancelled()) {
            yield put(Actions.canceledSyncTodos());
        }
    }
}

// function * syncSubs() {
//     const owner = yield select(Selectors.owner);
//     const parentPointId = yield select(Selectors.pointId);

//     yield put(Actions.syncingSubs(parentPointId));

//     try {
//         yield Queries.syncSubs(owner, parentPointId);
//     } catch (err) {
//         console.log('syncSub error', err);
//     } finally {
//         if (yield cancelled()) {
//             yield put(Actions.canceledSyncSubs(parentPointId));
//         }
//     }
// }

function * todoWatch() {
    yield fork(syncTodos);
}

// function * addPoint() {
//     const owner = yield select(Selectors.owner);
//     const parentPointId = yield select(Selectors.pointId);
//     yield Queries.addPoint(owner, parentPointId);
// }

// function * deletePoint({id}) {
//     yield Queries.deletePoint(id);
// }

// function * deletePoints({ids}) {
//     yield Queries.deletePoints(ids);
// }

// function * updatePoint({point, buffer = 0}) {
//     if (buffer > 0) {
//         yield delay(buffer);
//     }
//     yield put(Actions.updatingPoint(point.id));
//     yield Queries.updatePoint(point);
//     yield put(Actions.updatedPoint(point.id));
// }

// function * updatePoints({points}) {
//     const pointIds = points.map(point => point.id);
//     yield put(Actions.updatingPoints(pointIds));
//     yield Queries.updatePoints(points);
//     yield put(Actions.updatedPoints(pointIds));
// }

function * rootPointSaga() {
    let todoWatchTask;
    while (true) {
        yield take(AuthTypes.SYNCED_USER);
        const isLoggedIn = yield select(Selectors.auth.isLoggedIn);
        if (isLoggedIn) {
            todoWatchTask = yield fork(todoWatch);
        } else if (todoWatchTask !== undefined) {
            yield cancel(todoWatchTask);
        }
    }
}

export default [
    // function * () { yield takeEvery(Types.ADD_POINT, addPoint); },
    // function * () { yield takeEvery(Types.DELETE_POINT, deletePoint); },
    // function * () { yield takeEvery(Types.DELETE_POINTS, deletePoints); },
    // function * () { yield takeLatest(Types.UPDATE_POINT, updatePoint); },
    // function * () { yield takeLatest(Types.UPDATE_POINTS, updatePoints); },
    rootPointSaga,
];
