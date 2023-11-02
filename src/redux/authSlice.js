import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import { message } from 'antd';

//gia tri mat dinh
const userDatalocalStorage = window.localStorage.getItem('userData');
const signupDatalocalStorage = window.localStorage.getItem('userSignupData');
let statusLogin = false;
let parsedUserDatalocalStorage = null;
let parsedSignupDatalocalStorage = null;

//thông tin người dùng đăng nhập được lưu lại thông qua redux, và set lại giá trị khi người dùng thay đổi url mà chưa logout
if (userDatalocalStorage) {
  try {
    parsedUserDatalocalStorage = JSON.parse(userDatalocalStorage);
  } catch (error) {
    // Xử lý lỗi nếu dữ liệu không phải là một chuỗi JSON hợp lệ
    console.error('Error parsing JSON data from localStorage:', error);
  }
}
//thông tin người dùng đăng ký được lưu lại thông qua redux, và set lại giá trị khi người dùng thay đổi url
if (signupDatalocalStorage) {
  try {
    parsedSignupDatalocalStorage = JSON.parse(signupDatalocalStorage);
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
  signupData: parsedSignupDatalocalStorage || null,
  pending: false,
  error: null,
  isLogin: statusLogin,
  isSignup: false,
  otp: false,
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

      // console.log('>>> rs', rs.data);

      localStorage.setItem('accessToken', rs.data.data.accessToken);
      localStorage.setItem('userData', JSON.stringify(dataUser.userData));

      return rs.data.data;
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
  async (userSignupData, { rejectWithValue }) => {
    try {
      const rs = await authApi.signup(userSignupData);
      // The value we return becomes the `fulfilled` action payload
      const dataUser = {
        ...rs.data.data,
      };
      console.log('signupData', rs.data.data);

      localStorage.setItem('userSignupData', JSON.stringify(dataUser));

      return rs.data.data;
    } catch (err) {
      if (err.response && err.response.data.message) {
        throw rejectWithValue(err.response.data.message);
      } else {
        throw rejectWithValue(err.message);
      }
    }
  },
);

export const requestOtp = createAsyncThunk(
  'auth/requestOTP',
  async (requestOtp, { rejectWithValue }) => {
    try {
      const rs = await authApi.requestOTP(requestOtp);
      // console.log(rs.data.message);

      return rs.data.message;
    } catch (err) {
      if (err.response && err.response.data.message) {
        console.log(err.response.data.message);
        throw rejectWithValue(err.response.data.message);
      } else {
        throw rejectWithValue(err.message);
      }
    }
  },
);
export const authOTP = createAsyncThunk(
  'auth/authOTP ',
  async (requestOtp, { rejectWithValue }) => {
    try {
      const rs = await authApi.authOTP(requestOtp);
      return rs.data.message;
    } catch (err) {
      if (err.response && err.response.data.message) {
        throw rejectWithValue(err.response);
      } else {
        throw rejectWithValue(err.message);
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
    setIsSignup: (state, action) => {
      state.isSignup = action.payload; // Thay đổi giá trị isSignup dựa trên action.payload
    },
    isOtp: (state, action) => {
      state.otp = action.payload;
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
        state.signupData = payload;
        state.isSignup = true;
        state.authToken = payload.token;
        message.success(payload.message, 3);
      })
      .addCase(signupAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        message.error(payload, 3);
      })
      //trạng thái của requestOtp pending - fulfilled - rejected
      .addCase(requestOtp.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;

        state.otp = true;
        message.success(payload.message, 3);
      })
      .addCase(requestOtp.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        message.error(payload, 3);
      })
      //trạng thái của authOTP pending - fulfilled - rejected
      .addCase(authOTP.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(authOTP.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.otp = true;
        message.success(payload.message, 3);
      })
      .addCase(authOTP.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        state.otp = false;
        message.error(payload, 3);
      });
  },
});

export const { logout } = authSlice.actions;
export const { setIsSignup } = authSlice.actions;
export const { isOtp } = authSlice.actions;
export const selectProfile = (state) => state.auth.data;
export const selectSignupData = (state) => state.auth.signupData;
export const selectPending = (state) => state.auth.pending;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectIsSignup = (state) => state.auth.isSignup;
export const selectIsOtp = (state) => state.auth.otp;

export default authSlice.reducer;