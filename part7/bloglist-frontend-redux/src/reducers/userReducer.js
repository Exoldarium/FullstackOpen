import { createSlice } from '@reduxjs/toolkit';
import usersService from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    setSpecificUser(state, action) {
      return action.payload
    }
  }
});

export const { setUsers, setSpecificUser } = usersSlice.actions;

export function initializeUsers() {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch(setUsers(users));
  }
}

export function initializeSpecificUser(id) {
  return async (dispatch) => {
    const user = await usersService.getSpecificUser(id);
    dispatch(setSpecificUser(user));
  }
}

export default usersSlice.reducer;

