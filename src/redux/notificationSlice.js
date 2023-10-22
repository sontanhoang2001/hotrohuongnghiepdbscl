import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, { payload }) => {
      state.notifications.push(payload);
    },
    removeNotification: (state, { payload }) => {
      state.notifications = state.notifications.filter((n) => n.id !== payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
