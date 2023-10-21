import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
// import { toast } from "react-toastify"; // thông báo

import { message } from 'antd';

const initialState = {
  authToken: null,
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (userLoginData) => {
    const response = await authApi.login(userLoginData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
   
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.authToken = payload.token;
        state.success = true;
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
  },
});




// export const { decrement, incrementByAmount } = counterSlice.actions;


export const selectProfile = (state) => state.auth.data;

export default counterSlice.reducer;
