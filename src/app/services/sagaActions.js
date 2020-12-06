import { store, sagaAction, history } from '../store/store';
import {
  typeLoadStartData,
  typeCreateNewPost,
  typeDeletePost,
  typeEditPost,
  typeWritePost,
  typePostLike,
  typePostDislike
} from '../sagas/postsPageTypes';
import {
  typeUserLogin,
  typeUserLogOut,
  typeUserRegistr,
  typeUserEdit,
  typeUserDelete,
  typeUserWrite,
  typeUserProfile,
  typeUsersLoad,
  typeUserCreateNew,
  typeUserCancelEdit
} from '../sagas/usersPageTypes';

export const sagaLoadStartData = () => {
  sagaAction(typeLoadStartData());
};

export const sagaCreateNewPost = (currentUser, bodytext) => {
  sagaAction(typeCreateNewPost(currentUser, bodytext));
};

export const sagaDelPost = id => {
  sagaAction(typeDeletePost(id));
};

export const sagaEditPost = id => {
  sagaAction(typeEditPost(id));
};

export const sagaWritePost = (edited, callback) => {
  sagaAction(typeWritePost(edited, callback));
};

export const sagaUserLogin = (username, password, callback) => {
  sagaAction(typeUserLogin(username, password, callback));
};

export const sagaUserLogOut = () => {
  history.push('/login');
  sagaAction(typeUserLogOut());
};

export const sagaUserRegistr = (username, password, email, callback) => {
  sagaAction(typeUserRegistr(username, password, email, callback));
};

export const sagaUserEdit = id => {
  sagaAction(typeUserEdit(id));
};

export const sagaUserDelete = id => {
  sagaAction(typeUserDelete(id));
};

export const sagaUserWrite = user => {
  sagaAction(typeUserWrite(user));
};

export const sagaUserProfile = (user, callback) => {
  sagaAction(typeUserProfile(user, callback));
};

export const sagaUsersLoad = () => {
  sagaAction(typeUsersLoad());
};

export const sagaUserCreateNew = () => {
  sagaAction(typeUserCreateNew());
};

export const sagaUserCancelEdit = () => {
  sagaAction(typeUserCancelEdit());
};

export const sagaPostLike = (id, userId) => {
  const { posts: { posts } } = store.getState();
  sagaAction(typePostLike(id, userId, posts));
};

export const sagaPostDislike = (id, userId) => {
  const { posts: { posts } } = store.getState();
  sagaAction(typePostDislike(id, userId, posts));
};
