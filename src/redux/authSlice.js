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
  profile: parsedUserDatalocalStorage || null,
  signupData: parsedSignupDatalocalStorage || null,
  pending: false,
  error: null,
  isLogin: statusLogin,
  isSignup: false,
  authOtpSuccess: false,
  message: null,
  role: parsedUserDatalocalStorage?.Role.name || null,
  status: parsedUserDatalocalStorage?.status || null,
};
// tạo một Redux Thunk, bất đồng bộ được sử dụng để đăng nhập người dùng
export const signinAsync = createAsyncThunk(
  'auth/login',
  async (userLoginData, { rejectWithValue }) => {
    try {
      const rs = await authApi.signin(userLoginData);
      // console.log(rs.data.data);
      // The value we return becomes the `fulfilled` action payload
      const dataUser = {
        ...rs.data.data,
      };

      // console.log('>>> rs', rs.data.data);
      // console.log('>>> rs', dataUser);

      localStorage.setItem('accessToken', rs.data.data.accessToken);
      localStorage.setItem('userData', JSON.stringify(dataUser.userData));

      return dataUser;
    } catch (err) {
      if (err.response && err.response.data.message) {
        throw rejectWithValue(err.response.data.message);
      } else {
        throw rejectWithValue(err.message);
      }
    }
  },
);
// tạo một Redux Thunk, bất đồng bộ được sử dụng để đăng ký người dùng
export const signupAsync = createAsyncThunk(
  'auth/registerUser',
  async (userSignupData, { rejectWithValue }) => {
    try {
      const rs = await authApi.signup(userSignupData);
      // The value we return becomes the `fulfilled` action payload
      const dataUser = {
        ...rs.data.data,
      };

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
// tạo một Redux Thunk, bất đồng bộ được sử dụng gửi yêu cầu otp người dùng
export const requestOtp = createAsyncThunk(
  'auth/requestOTP',
  async (requestOtp, { rejectWithValue }) => {
    try {
      const rs = await authApi.requestOTP(requestOtp);
      // console.log(rs.data.message)
      return rs.data.message;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
// tạo một Redux Thunk, bất đồng bộ được sử dụng xác thực otp người dùng
export const authOTP = createAsyncThunk(
  'auth/authOTP ',
  async (requestOtp, { rejectWithValue }) => {
    try {
      const rs = await authApi.authOTP(requestOtp);
      return rs.data.message;
    } catch (err) {
      if (err.response && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  },
);
// tạo một Redux Thunk, bất đồng bộ được sử dụng xác thực otp người dùng
export const authChangeEmailAsync = createAsyncThunk(
  'auth/authChangeEmail',
  async (data, { rejectWithValue }) => {
    try {
      const rs = await authApi.authChangeEmail(data);
      return rs.data.message;
    } catch (err) {
      if (err.response && err.response.data.message) {
        throw rejectWithValue(err.response.data.message);
      } else {
        throw rejectWithValue(err.message);
      }
    }
  },
);

// tạo một Redux Thunk, bất đồng bộ được sử dụng để đổi mật khẩu người dùng
export const changePasswordAsync = createAsyncThunk(
  'auth/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      const rs = await authApi.signin(data);
      return rs.data.message;
    } catch (err) {
      if (err.response && err.response.data.message) {
        throw rejectWithValue(err.response.data.message);
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
      state.signupData = {};
      state.isLogin = false;
      state.role = null;
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('userData');
      window.localStorage.removeItem('userSignupData');
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
        state.data = payload.userData;
        state.authToken = payload.accessToken;
        state.isLogin = payload.userData.status === 1 ? true : false;
        state.role = payload.userData.Role.name || null;
        state.status = payload.userData.status;
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
        message.success('Đăng ký thành công', 3);
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
        message.success('Mã otp đã gửi đến mail của bạn', 3);
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
        state.otp = true;
        message.success(payload, 3);
      })
      .addCase(authOTP.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        state.otp = false;
        message.error(payload, 3);
      })
      //trạng thái của authEmtail pending - fulfilled - rejected
      .addCase(authChangeEmailAsync.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(authChangeEmailAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.otp = true;
        message.success('Mã otp đã gửi đến mail của bạn', 3);
      })
      .addCase(authChangeEmailAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        state.otp = false;
        message.error(payload, 3);
      })
      //trạng thái của changePasswordAsync pending - fulfilled - rejected
      .addCase(changePasswordAsync.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(changePasswordAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        message.success('Đổi mật khẩu thành công', 3);
      })
      .addCase(changePasswordAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
        message.error(payload, 3);
      });
  },
});

export const { logout, setIsSignup, isOtp } = authSlice.actions;
export const selectLoginData = (state) => state.auth.data;
export const selectProfile = (state) => state.auth.profile;
export const selectSignupData = (state) => state.auth.signupData;
export const selectPending = (state) => state.auth.pending;
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectIsSignup = (state) => state.auth.isSignup;
export const selectIsOtp = (state) => state.auth.otp;
export const selectRole = (state) => state.auth.role;

export default authSlice.reducer;
