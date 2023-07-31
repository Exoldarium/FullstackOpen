import { configureStore } from '@reduxjs/toolkit';
import messageReducer from './reducers/messageReducer';
import blogReducer from './reducers/blogReducer';

export const store = configureStore({
  reducer: {
    message: messageReducer,
    blogs: blogReducer
  }
});