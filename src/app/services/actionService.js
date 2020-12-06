import callWebApi from '../helpers/apiHelper';

export const login = async request => {
  try {
    const response = await callWebApi({
      endpoint: '/users/login',
      type: 'POST',
      request
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const createUser = async request => {
  try {
    const response = await callWebApi({
      endpoint: '/users/',
      type: 'POST',
      request
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const loadUsers = async () => {
  try {
    const response = await callWebApi({
      endpoint: '/users/',
      type: 'GET'
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const updateUser = async (userId, request) => {
  try {
    const response = await callWebApi({
      endpoint: `/users/${userId}`,
      type: 'PUT',
      request
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const getUser = async userId => {
  try {
    const response = await callWebApi({
      endpoint: `/users/${userId}`,
      type: 'GET'
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const deleteUser = async userId => {
  try {
    const response = await callWebApi({
      endpoint: `/users/${userId}`,
      type: 'DELETE'
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const loadPosts = async () => {
  try {
    const response = await callWebApi({
      endpoint: '/posts/',
      type: 'GET'
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const createPost = async request => {
  try {
    const response = await callWebApi({
      endpoint: '/posts/',
      type: 'POST',
      request
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const getPost = async userId => {
  try {
    const response = await callWebApi({
      endpoint: `/posts/${userId}`,
      type: 'GET'
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const updatePost = async request => {
  try {
    const response = await callWebApi({
      endpoint: '/posts/',
      type: 'PUT',
      request
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const deletePost = async postId => {
  try {
    const response = await callWebApi({
      endpoint: `/posts/${postId}`,
      type: 'DELETE'
    });
    return response.json();
  } catch (e) {
    return null;
  }
};

export const setPostReaction = async request => {
  try {
    const response = await callWebApi({
      endpoint: '/posts/reaction',
      type: 'POST',
      request
    });
    return response.json();
  } catch (e) {
    return null;
  }
};
