// redux/slices/unreadMessagesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const unreadMessagesSlice = createSlice({
  name: "unreadMessages",
  initialState,
  reducers: {
    addUnreadMessage: (state, action) => {
      const { receiverId } = action.payload;
      if (!state[receiverId]) {
        state[receiverId] = true;
      }
    },
    markMessageAsRead: (state, action) => {
      const { receiverId } = action.payload;
      state[receiverId] = false;
    },
  },
});

export const { addUnreadMessage, markMessageAsRead } = unreadMessagesSlice.actions;
export default unreadMessagesSlice.reducer;
