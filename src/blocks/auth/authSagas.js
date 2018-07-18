import firebase from 'firebase';
import {takeLatest,call,put,take} from 'redux-saga/effects';
import {Types,Actions} from '@/auth/authActions';
import rsf from 'src/store/base';

const authProvider = new firebase.auth.GoogleAuthProvider();
authProvider.addScope('email');

function * login() {
    yield put(Actions.loggingIn());
    try {
        const data = yield call(rsf.auth.signInWithPopup, authProvider);
        yield put(Actions.loggedIn(data));
    } catch (error) {
        yield put(Actions.loginError(error));
    }
}

function * logout () {
    yield put(Actions.loggingOut());
    try {
        const data = yield call(rsf.auth.signOut);
        yield put(Actions.loggedOut(data));
    } catch (error) {
        yield put(Actions.logoutError(error));
    }
}

function * syncUser () {
    const channel = yield call(rsf.auth.channel);
    while (true) {
        const { user } = yield take(channel);
        if (user) {
            yield put(Actions.syncedUser(user));
        } else {
            yield put(Actions.syncedUser(null));
        }
    }
}

export default [
    syncUser,
    function * () { yield takeLatest(Types.LOGIN, login); },
    function * () { yield takeLatest(Types.LOGOUT, logout); },
];
