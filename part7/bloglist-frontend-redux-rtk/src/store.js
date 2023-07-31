import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './services/blogService';
import messageReducer from './reducers/messageReducer';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    message: messageReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});