
export const USER_USER_LOGIN = 'USER_USER_LOGIN';
export const USER_REGIS_LOGIN = 'USER_REGIS_LOGIN';
export const USER_USER_LOGOUT = 'USER_USER_LOGOUT';
export const USER_EDIT_EDIT = 'USER_EDIT_EDIT';
export const USER_DELETE = 'USER_DELETE';
export const USER_WRITES = 'USER_WRITES';
export const USER_WRITES_PROFILE = 'USER_PROFILE';
export const USERS_LOAD_LOAD = 'USER_LOAD_LOAD';
export const USER_CREATE_NEW = 'USER_CREATE_NEW';
export const USER_CANCEL_EDIT = 'USER_CANCEL_EDIT';

export const typeUserLogin = (username, password, callback) => ({
  type: USER_USER_LOGIN,
  username,
  password,
  callback
});

export const typeUserLogOut = () => ({
  type: USER_USER_LOGOUT
});

export const typeUserRegistr = (username, password, email, callback) => ({
  type: USER_REGIS_LOGIN,
  username,
  password,
  email,
  callback
});

export const typeUserEdit = id => ({
  type: USER_EDIT_EDIT,
  id
});

export const typeUserDelete = id => ({
  type: USER_DELETE,
  id
});

export const typeUserWrite = user => ({
  type: USER_WRITES,
  user
});

export const typeUserProfile = (user, callback) => ({
  type: USER_WRITES_PROFILE,
  user,
  callback
});

export const typeUsersLoad = () => ({
  type: USERS_LOAD_LOAD
});

export const typeUserCreateNew = () => ({
  type: USER_CREATE_NEW
});

export const typeUserCancelEdit = () => ({
  type: USER_CANCEL_EDIT
});
