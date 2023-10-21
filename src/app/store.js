import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import authReducer from '../redux/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
