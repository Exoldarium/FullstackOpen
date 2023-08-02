import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/messageReducer';
import blogReducer from './reducers/blogReducer';
import loginReducer from './reducers/loginReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer
  }
});