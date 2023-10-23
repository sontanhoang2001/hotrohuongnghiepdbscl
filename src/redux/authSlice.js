import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';


import { message } from 'antd';

const initialState = {
  authToken: null,
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const loginAsync = createAsyncThunk('auth/login', async (userLoginData, rejectWithValue) => {
  try {
    const rs = await authApi.login(userLoginData);
    // The value we return becomes the `fulfilled` action payload
    const dataUser = {
      ...rs.data.data.userData,
    };

    console.log('>>> rs', rs);

    localStorage.setItem('accessToken', rs.data.data.accessToken);
    localStorage.setItem('userData', JSON.stringify(dataUser));

    return rs.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

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
        message.success("Đăng nhập thành công", 3, onclose);
      })
      .addCase(loginAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        message.error("Đăng nhập thất bại", 3, onclose);
      });
  },
});

// export const { decrement, incrementByAmount } = counterSlice.actions;

export const selectProfile = (state) => state.auth.data;

export default counterSlice.reducer;
