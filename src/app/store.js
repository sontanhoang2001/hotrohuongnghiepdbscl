import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import authReducer from '../redux/authSlice';
import mbtiReducer from '../redux/mbtiSlice';
import userReducer from '../redux/userSlice';
import universityReducer from '../redux/universitySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    mbti: mbtiReducer,
    user: userReducer,
    university: universityReducer,
  },
  // middleware: [authMiddleware],
});
