import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: 'message',
  initialState: 'MESSAGE',
  reducers: {
    setNotificationMessage(state, action) {
      return action.payload
    },
  }
});

export const { setNotificationMessage } = messageSlice.actions;

export function setNotification(content, time) {
  return async (dispatch) => {
    dispatch(setNotificationMessage(content));
    setTimeout(() => {
      dispatch(setNotificationMessage(''))
    }, time * 1000);
  }
}

export default messageSlice.reducer;