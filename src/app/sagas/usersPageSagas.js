import { put, takeEvery, all, delay } from 'redux-saga/effects';
import { saveCurrentUser } from '../services/stringService';
import { errorToast } from '../helpers/infoHelper';
import * as serv from '../services/actionService';
import { loadPostCollection } from './postsPageSagas';
import {
  USER_USER_LOGIN,
  USER_REGIS_LOGIN,
  USER_USER_LOGOUT,
  USER_EDIT_EDIT,
  USER_DELETE,
  USER_WRITES,
  USER_WRITES_PROFILE,
  USERS_LOAD_LOAD,
  USER_CREATE_NEW,
  USER_CANCEL_EDIT
} from './usersPageTypes';
import {
  SET_USER_LOGIN,
  SET_USER_LOGOUT,
  SET_USER_EDIT,
  SET_USER_LIST
} from '../store/usersReducer';

const setUserLogin = user => ({
  type: SET_USER_LOGIN,
  user
});

const setUserLogout = () => ({
  type: SET_USER_LOGOUT
});

const setUserToEdit = user => ({
  type: SET_USER_EDIT,
  user
});

const setUserList = users => ({
  type: SET_USER_LIST,
  users
});

export function* userLogin(action) {
  try {
    const { username, password, callback } = action;
    yield delay(1000);
    const { user } = yield serv.login({ username, password });
    if (user) {
      yield loadPostCollection();
      yield put(setUserLogin(user));
      saveCurrentUser(user);
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    errorToast(`User Login error : \n ${error.message}`);
  }
}

function* watchUserLogin() {
  yield takeEvery(USER_USER_LOGIN, userLogin);
}

export function* userRegistr(action) {
  try {
    const { username, password, email, callback } = action;
    yield delay(1000);
    const { user, message } = yield serv.createUser({ username, password, email, admin: false });
    if (user) {
      yield loadPostCollection();
      yield put(setUserLogin(user));
      saveCurrentUser(user);
      callback('');
    } else {
      callback(message);
    }
  } catch (error) {
    errorToast(`User Registr error : \n ${error.message}`);
  }
}

function* watchUserRegistr() {
  yield takeEvery(USER_REGIS_LOGIN, userRegistr);
}

export function* userEditEdit(action) {
  try {
    const { id } = action;
    const user = yield serv.getUser(id);
    if (user) {
      yield put(setUserToEdit(user));
    }
  } catch (error) {
    errorToast(`Select user error : \n ${error.message}`);
  }
}

function* watchUserEdit() {
  yield takeEvery(USER_EDIT_EDIT, userEditEdit);
}

function* loadAllUsers() {
  const users = yield serv.loadUsers();
  if (users) {
    yield put(setUserList(users));
  }
}

export function* userDelete(action) {
  try {
    const { id } = action;
    const user = yield serv.deleteUser(id);
    if (user) {
      yield loadAllUsers();
    }
  } catch (error) {
    errorToast(`Select user error : \n ${error.message}`);
  }
}

function* watchUserDelete() {
  yield takeEvery(USER_DELETE, userDelete);
}

export function* userWrite(action) {
  try {
    const { user } = action;
    if (user.id) {
      const newUser = yield serv.updateUser(user);
      if (newUser) {
        yield loadAllUsers();
      }
    }
  } catch (error) {
    errorToast(`Select user error : \n ${error.message}`);
  }
}

function* watchUserWrite() {
  yield takeEvery(USER_WRITES, userWrite);
}

export function* userWriteProfile(action) {
  try {
    const { user, callback } = action;
    let data;
    if (!user.id || user.id === '') {
      data = yield serv.createUser(user);
    } else {
      data = yield serv.updateUser(user.id, user);
    }
    const { message } = data;
    if (!message || message === '') {
      yield put(setUserToEdit(null));
      yield loadAllUsers();
      yield callback('');
    } else {
      yield callback(message);
    }
  } catch (error) {
    errorToast(`Select user error : \n ${error.message}`);
  }
}

function* watchUserProfile() {
  yield takeEvery(USER_WRITES_PROFILE, userWriteProfile);
}

export function* userLoadLoad() {
  try {
    const users = yield serv.loadUsers();
    if (users) {
      yield put(setUserList(users));
    }
  } catch (error) {
    errorToast(`Select user error : \n ${error.message}`);
  }
}

function* watchUserLoad() {
  yield takeEvery(USERS_LOAD_LOAD, userLoadLoad);
}

export function* userLogOut() {
  localStorage.clear();
  yield put(setUserLogout());
}

function* watchUserLogOut() {
  yield takeEvery(USER_USER_LOGOUT, userLogOut);
}

export function* userCreateNewUser() {
  yield put(setUserToEdit({}));
}

function* watchCreateNewUser() {
  yield takeEvery(USER_CREATE_NEW, userCreateNewUser);
}

export function* userCancelEdit() {
  yield put(setUserToEdit(null));
}

function* watchCancelNewUser() {
  yield takeEvery(USER_CANCEL_EDIT, userCancelEdit);
}

export default function* usersPageSagas() {
  yield all([
    watchUserLogin(),
    watchUserRegistr(),
    watchUserEdit(),
    watchUserDelete(),
    watchUserWrite(),
    watchUserProfile(),
    watchUserLoad(),
    watchUserLogOut(),
    watchCreateNewUser(),
    watchCancelNewUser()
  ]);
}
