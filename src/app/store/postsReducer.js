export const SET_POSTS_COLLECTION = 'SET_POSTS_COLLECTION';
export const SET_POST_EDIT = 'SET_POSTS_TO_EDIT';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_POSTS_COLLECTION:
      return {
        ...state,
        posts: action.posts
      };
    case SET_POST_EDIT:
      return {
        ...state,
        editedPost: action.post
      };
    default:
      return state;
  }
};

export default reducer;
