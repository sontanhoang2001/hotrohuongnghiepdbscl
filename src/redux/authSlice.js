import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import { useEffect } from 'react';
// import { toast } from "react-toastify"; // thông báo

const initialState = {
  authToken: null,
  data: null,
  pending: false,
  error: null,
  success: false,
};

export const loginAsync = createAsyncThunk('auth/login', async (userLoginData, rejectWithValue) => {
  try {
    const rs = await authApi.login(userLoginData);
    // The value we return becomes the `fulfilled` action payload
    const dataUser = {
      ...rs.data.data,
    };

    // console.log('>>> rs', rs);
    // console.log('>>> role', dataUser.userData.role);

    localStorage.setItem('accessToken', rs.data.data.accessToken);
    localStorage.setItem('userData', JSON.stringify(dataUser.userData));

    return rs.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = {};
      localStorage.removeItem('auth_token');
      localStorage.removeItem('data_user');
      window.location.reload();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.authToken = payload.token;
        state.success = true;
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectProfile = (state) => state.auth.data;
export const selectPending = (state) => state.auth.pending;

export default authSlice.reducer;
