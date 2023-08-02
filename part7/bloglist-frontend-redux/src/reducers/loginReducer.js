import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setMessage } from './messageReducer';

const loginSlice = createSlice({
  name: 'login',
  initialState: 'LOGIN',
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
});

export const { setUser } = loginSlice.actions;


export function initializeLogin(credentials) {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loginCredentials', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (err) {
      console.log(err);
      dispatch(setMessage({
        content: 'wrong credentials',
        type: 'ERROR'
      }, 5));
    }
  }
}

export default loginSlice.reducer;