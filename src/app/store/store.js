import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootSaga from '../sagas/index';
import postsReducer from './postsReducer';
import usersReducer from './usersReducer';
import modalReducer from './modalReducer';

export const history = createBrowserHistory();

const loadStatePath = () => {
  try {
    const appPath = window.sessionStorage.getItem('app_state');
    if (appPath) history.push(appPath);
  } catch (err) {
    // Log errors here, or ignore
  }
};

loadStatePath();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  sagaMiddleware
];

const composedEnhancers = compose(
  applyMiddleware(...middlewares)
);

const initialState = {};

const reducers = {
  posts: postsReducer,
  users: usersReducer,
  modals: modalReducer
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
});

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

const saveStatePath = state => {
  try {
    const appPath = state.router.location.pathname;
    window.sessionStorage.setItem('app_state', appPath);
  } catch (err) {
    // Log errors here, or ignore
  }
};

store.subscribe(() => {
  saveStatePath(store.getState());
});

export const sagaAction = data => store.dispatch(data);

sagaMiddleware.run(rootSaga);
