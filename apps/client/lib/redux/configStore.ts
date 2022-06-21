import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import UserReducer from './User/UserReducer';
import AdminReducer from './Admin/AdminReducer';

const ConfigStore = () => createStore(
  combineReducers({
    userProfile: UserReducer,
    admin: AdminReducer,
  }),
  applyMiddleware(thunk, logger),
);

export default ConfigStore;
