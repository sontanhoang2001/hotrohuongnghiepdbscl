import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import authReducer from '../redux/authSlice';
import mbtiReducer from '../redux/mbtiSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    mbti: mbtiReducer,
  },
  // middleware: [authMiddleware],
});
