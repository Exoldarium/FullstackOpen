import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: 'message',
  initialState: 'MESSAGE',
  reducers: {
    voteMessage(state, action) {
      const payload = action.payload;
      return payload
    },
  }
});

export const { voteMessage } = messageSlice.actions;
export default messageSlice.reducer;