import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import { message } from 'antd';

//gia tri mat dinh
const userDatalocalStorage = window.localStorage.getItem('userData');
let statusLogin = false;
let parsedUserDatalocalStorage = null;

if (userDatalocalStorage) {
  try {
    parsedUserDatalocalStorage = JSON.parse(userDatalocalStorage);
  } catch (error) {
    // Xử lý lỗi nếu dữ liệu không phải là một chuỗi JSON hợp lệ
    console.error('Error parsing JSON data from localStorage:', error);
  }
}

if (
  parsedUserDatalocalStorage != null &&
  parsedUserDatalocalStorage !== undefined &&
  parsedUserDatalocalStorage !== ''
) {
  statusLogin = true;
} else statusLogin = false;

const initialState = {
  authToken: null,
  data: parsedUserDatalocalStorage || null,
  pending: false,
  error: null,
  isLogin: statusLogin,
  message: null,
};

export const signinAsync = createAsyncThunk(
  'auth/login',
  async (userLoginData, { rejectWithValue }) => {
    try {
      const rs = await authApi.signin(userLoginData);
      // The value we return becomes the `fulfilled` action payload
      const dataUser = {
        ...rs.data.data,
      };

      console.log('>>> rs', rs.data);
      // console.log('>>> role', dataUser.userData.role);

      localStorage.setItem('accessToken', rs.data.data.accessToken);
      localStorage.setItem('userData', JSON.stringify(dataUser.userData));

      return rs.data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        throw rejectWithValue(err.response.data.message);
      } else {
        throw rejectWithValue(err.message);
      }
    }
  },
);
export const signupAsync = createAsyncThunk(
  'auth/registerUser',
  async (userLoginData, { rejectWithValue }) => {
    try {
      const rs = await authApi.signup(userLoginData);
      // The value we return becomes the `fulfilled` action payload
      const dataUser = {
        ...rs.data.data,
      };

      console.log(dataUser);

      localStorage.setItem('userSignupData', JSON.stringify(dataUser.userData));
      if (rs.data.status) {
      }

      return rs.data.message;
    } catch (error) {
      if (error.response && error.response.data.message) {
        //"rejectWithValue is not a function" nó báo về đây nè
        //có khi thằng này mình viết sai syntax
        //
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.data = {};
      state.isLogin = false;
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('userData');
      window.location.reload();
    },
  },

  extraReducers: (builder) => {
    builder
      //trạng thái của signinAsync pending - fulfilled - rejected
      .addCase(signinAsync.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(signinAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.authToken = payload.token;
        state.isLogin = true;
        console.log(payload.message);
        message.success(payload.message, 3);
      })

      .addCase(signinAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        message.error(payload, 3);
      })
      //trạng thái của signupAsync pending - fulfilled - rejected
      .addCase(signupAsync.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(signupAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.authToken = payload.token;
        state.isLogin = true;
        message.success(payload.message, 3);
      })
      .addCase(signupAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        message.error(payload, 3);
      });
  },
});

export const { logout } = authSlice.actions;
export const selectProfile = (state) => state.auth.data;
export const selectPending = (state) => state.auth.pending;
export const selectIsLogin = (state) => state.auth.isLogin;

export default authSlice.reducer;