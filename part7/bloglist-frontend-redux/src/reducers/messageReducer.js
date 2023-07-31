import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: 'MESSAGE',
  reducers: {
    setNotificationMessage(state, action) {
      const obj = {
        type: action.payload.type,
        content: action.payload.content
      }
      return obj
    },
  }
});

export const { setNotificationMessage, setSuccessMessage, setErrorMessage } = messageSlice.actions;

export function setMessage(content, time) {
  return async (dispatch) => {
    const newContent = await content;
    dispatch(setNotificationMessage(newContent));
    setTimeout(() => {
      dispatch(setNotificationMessage(''))
    }, time * 1000)
  }
}

export default messageSlice.reducer;