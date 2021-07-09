import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';
import { sidebarReducer as sidebarShow } from './sidebarReducer';

const rootReducer = combineReducers({
    currentUser: userReducer,
    sidebarShow
});

export default rootReducer;