import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdote(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    modifyAnecdote(state, action) {
      const newState = state.filter(a => a.id !== action.payload.id);
      newState.push(action.payload);
      return newState.sort((a, b) => b.votes - a.votes);
    }
  }
});

export const {
  appendAnecdote,
  setAnecdote,
  modifyAnecdote
} = anecdoteSlice.actions;

export function initializeAnecdotes() {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    anecdotes.sort((a, b) => b.votes - a.votes);
    dispatch(setAnecdote(anecdotes));
  }
}

export function createAnecdote(content) {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  }
}

export function updateAnecdotes(content) {
  return async (dispatch) => {
    const copy = { ...content }
    copy.votes += 1;
    const anecdote = await anecdoteService.updateExisting(copy.id, copy);
    dispatch(modifyAnecdote(anecdote));
  }
}

export default anecdoteSlice.reducer;