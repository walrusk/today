import { all, fork } from 'redux-saga/effects';
//import appSagas from '@/app/appSagas';
import authSagas from '@/auth/authSagas';

const sagas = [
    //...appSagas,
    ...authSagas,
];

export default function * rootSaga() {
    yield all([
        ...sagas.map(saga => fork(saga)),
    ]);
}
