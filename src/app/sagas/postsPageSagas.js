import { put, takeEvery, all, delay } from 'redux-saga/effects';
import { loadCurrentUser } from '../services/stringService';
import { errorToast } from '../helpers/infoHelper';
import * as serv from '../services/actionService';
import {
  LOAD_START_DATA,
  EDIT_POST_POST,
  WRITE_POST_LIKE,
  WRITE_POST_DISLIKE
} from './postsPageTypes';
import {
  SET_LOAD_FINISH,
  SET_USER_LOGIN,
  STATISTIC
} from '../store/usersReducer';
import { SET_POSTS_COLLECTION, SET_POST_EDIT } from '../store/postsReducer';

// export const LOAD_START_DATA = 'LOAD_START_DATA';
export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const DELETE_POST_POST = 'DELETE_POST_POST';
export const WRITE_POST_POST = 'WRITE_POST_POST';

const setPostsCollection = posts => ({
  type: SET_POSTS_COLLECTION,
  posts
});

const setPostToEdit = post => ({
  type: SET_POST_EDIT,
  post
});

const setStatistic = data => ({
  type: STATISTIC,
  data
});

const setLoadFinish = () => ({
  type: SET_LOAD_FINISH,
  loading: false
});

const setUserLogin = user => ({
  type: SET_USER_LOGIN,
  user
});

function fullTime(data) {
  const result = new Date(data);
  return result.getTime();
}

export function* loadPostCollection() {
  const posts = yield serv.loadPosts();
  if (posts) {
    posts.sort((a, b) => (fullTime(b.createdAt) - fullTime(a.createdAt)));
    yield put(setPostsCollection(posts));
    const list = new Set();
    posts.forEach(item => list.add(item.userId));
    const usersCount = list.size;
    const postsCount = posts.length;
    const lastData = posts[0].createdAt;
    yield put(setStatistic({ usersCount, postsCount, lastData }));
  }
}

export function* loadStartData() {
  try {
    const user = yield loadCurrentUser();
    if (user) {
      yield loadPostCollection();
      yield put(setUserLogin(user));
    }
    yield delay(1200);
    yield put(setLoadFinish());
  } catch (error) {
    errorToast(`load start data error : \n ${error.message}`);
  }
}

function* watchStartData() {
  yield takeEvery(LOAD_START_DATA, loadStartData);
}

export function* createPost(action) {
  try {
    const { currentUser, bodytext } = action;
    const newPost = {
      userId: currentUser.id,
      text: bodytext,
      createdAt: new Date(),
      likes: 0,
      dislikes: 0
    };
    const addPost = yield serv.createPost(newPost);
    if (addPost) {
      yield loadPostCollection();
    }
  } catch (error) {
    errorToast(`Create post error : \n ${error.message}`);
  }
}

function* watchNewPost() {
  yield takeEvery(CREATE_NEW_POST, createPost);
}

export function* deletePost(action) {
  try {
    const { id } = action;
    const delPost = yield serv.deletePost(id);
    if (delPost) {
      yield loadPostCollection();
    }
  } catch (error) {
    errorToast(`Delete post error : \n ${error.message}`);
  }
}

function* watchDeletePost() {
  yield takeEvery(DELETE_POST_POST, deletePost);
}

export function* editPost(action) {
  try {
    const { id } = action;
    const post = yield serv.getPost(id);
    if (post) {
      yield put(setPostToEdit(post));
    }
  } catch (error) {
    errorToast(`Write post error : \n ${error.message}`);
  }
}

function* watchEditPost() {
  yield takeEvery(EDIT_POST_POST, editPost);
}

export function* writePost(action) {
  try {
    const { edited, callback } = action;
    const updPost = yield serv.updatePost(edited);
    if (updPost) {
      yield put(setPostToEdit(null));
      yield loadPostCollection();
      callback(true);
    } else {
      callback(false);
    }
  } catch (error) {
    errorToast(`Write post error : \n ${error.message}`);
  }
}

function* watchWritePost() {
  yield takeEvery(WRITE_POST_POST, writePost);
}

export function* userLikePost(action) {
  try {
    const { id, userId, posts } = action;
    const { newLike, newDislake } = yield serv.setPostReaction({ postId: id, userId, isLike: true });
    const newPosts = posts.map(post => {
      const item = post;
      if (item.id === id) {
        item.likes = Number(item.likes) + newLike;
        item.dislikes = Number(item.dislikes) + newDislake;
      }
      return item;
    });
    yield put(setPostsCollection(newPosts));
  } catch (error) {
    errorToast(`Write post error : \n ${error.message}`);
  }
}

function* watchUserLikePost() {
  yield takeEvery(WRITE_POST_LIKE, userLikePost);
}

export function* userDislikePost(action) {
  try {
    const { id, userId, posts } = action;
    const { newLike, newDislake } = yield serv.setPostReaction({ postId: id, userId, isLike: false });
    const newPosts = posts.map(post => {
      const item = post;
      if (item.id === id) {
        item.likes = Number(item.likes) + newLike;
        item.dislikes = Number(item.dislikes) + newDislake;
      }
      return item;
    });
    yield put(setPostsCollection(newPosts));
  } catch (error) {
    errorToast(`Write post error : \n ${error.message}`);
  }
}

function* watchUserDislikePost() {
  yield takeEvery(WRITE_POST_DISLIKE, userDislikePost);
}

export default function* postsPageSagas() {
  yield all([
    watchStartData(),
    watchNewPost(),
    watchDeletePost(),
    watchEditPost(),
    watchWritePost(),
    watchUserLikePost(),
    watchUserDislikePost()
  ]);
}
