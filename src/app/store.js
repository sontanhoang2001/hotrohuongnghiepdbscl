import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import authReducer from '../redux/authSlice';
import notificationReducer from '../redux/notificationSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    notification: notificationReducer,
  },
  // middleware: [authMiddleware],
});
