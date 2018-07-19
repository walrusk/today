import { all, fork } from 'redux-saga/effects';
import authSagas from '@/auth/authSagas';
import listSagas from '@/list/listSagas';

const sagas = [
    ...authSagas,
    ...listSagas,
];

export default function * rootSaga() {
    yield all([
        ...sagas.map(saga => fork(saga)),
    ]);
}
