import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlice';
import authReducer from '../redux/authSlice';

// Auth middleware
const authMiddleware = store => next => action => {

  const {auth} = store.getState();

  //Chưa đăng nhập thì chặn lại
  if(!auth.isAuthenticated && action.type !== 'auth/login') {
    console.log('User is not authenticated');
    // throw new Error('User is not authenticated'); 
  }

  return next(action);
}

// Error middleware
const errorMiddleware = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    console.error('Caught error', err);
    // dispatch error action here    
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  // middleware: [authMiddleware],
});
