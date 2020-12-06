export const SET_USER_LIST = 'SET_USER_LIST';
export const SET_LOAD_FINISH = 'SET_LOAD_FINISH';
export const SET_USER_LOGIN = 'SET_USER_LOGIN';
export const SET_USER_LOGOUT = 'SET_USER_LOGOUT';
export const SET_USER_EDIT = 'SET_USER_TO_EDIT';
export const STATISTIC = 'SET_USER_STATISTIC';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return {
        ...state,
        users: action.users
      };
    case SET_LOAD_FINISH:
      return {
        ...state,
        isLoading: action.loading
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        currentUser: action.user,
        isAuthorized: true
      };
    case SET_USER_LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthorized: false
      };
    case SET_USER_EDIT:
      return {
        ...state,
        editedUser: action.user
      };
    case STATISTIC:
      return {
        ...state,
        statistic: action.data
      };
    default:
      return state;
  }
};
