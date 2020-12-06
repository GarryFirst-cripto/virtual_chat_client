import { all } from 'redux-saga/effects';
import postsPageSagas from './postsPageSagas';
import usersPageSagas from './usersPageSagas';

export default function* rootSaga() {
  yield all([
    postsPageSagas(),
    usersPageSagas()
  ]);
}
