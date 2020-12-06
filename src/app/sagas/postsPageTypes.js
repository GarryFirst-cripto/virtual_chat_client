
export const LOAD_START_DATA = 'LOAD_START_DATA';
export const CREATE_NEW_POST = 'CREATE_NEW_POST';
export const DELETE_POST_POST = 'DELETE_POST_POST';
export const EDIT_POST_POST = 'EDIT_POST_POST';
export const WRITE_POST_POST = 'WRITE_POST_POST';
export const WRITE_POST_LIKE = 'WRITE_POST_LIKE';
export const WRITE_POST_DISLIKE = 'WRITE_POST_DISLIKE';

export const typeLoadStartData = () => ({
  type: LOAD_START_DATA
});

export const typeCreateNewPost = (currentUser, bodytext) => ({
  type: CREATE_NEW_POST,
  currentUser,
  bodytext
});

export const typeDeletePost = id => ({
  type: DELETE_POST_POST,
  id
});

export const typeEditPost = id => ({
  type: EDIT_POST_POST,
  id
});

export const typeWritePost = (edited, callback) => ({
  type: WRITE_POST_POST,
  edited,
  callback
});

export const typePostLike = (id, userId, posts) => ({
  type: WRITE_POST_LIKE,
  id,
  userId,
  posts
});

export const typePostDislike = (id, userId, posts) => ({
  type: WRITE_POST_DISLIKE,
  id,
  userId,
  posts
});
