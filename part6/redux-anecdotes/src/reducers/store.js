import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./anecdoteReducer";
import filterReducer from "./filterReducer";
import messageReducer from "./messageReducer";

export const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    message: messageReducer
  }
});
