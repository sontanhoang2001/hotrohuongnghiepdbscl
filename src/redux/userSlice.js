import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import { format } from 'date-fns';
import { notification } from 'antd';

const initialState = {
  data: null,
  pending: false,
  page: 1,
  size: 7,
  total: null,
};
//get all
export const getAllUserAsync = createAsyncThunk(
  'user/getAllUser',
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const rs = await userApi.getAllUser(page, size);
      return rs.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
//delete
export const deleleUserAsync = createAsyncThunk(
  'user/deleleUserAsync',
  async (id, { rejectWithValue }) => {
    try {
      const rs = await userApi.deleteUser(id);
      return rs.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
//restore
export const restoreUserAsync = createAsyncThunk(
  'user/restoreUserAsync',
  async (id, { rejectWithValue }) => {
    try {
      const rs = await userApi.restoreUser(id);
      return rs.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await userApi.updateUser(payload);
      return rs.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await userApi.getUserProfile();
      return rs.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      //restoreUserAsync
      .addCase(restoreUserAsync.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(restoreUserAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Khôi phục thành công' });
      })
      .addCase(restoreUserAsync.rejected, (state, { payload }) => {
        notification.error({ message: 'Khôi phục thất bại' });
        state.pending = false;
      })
      //delete
      .addCase(deleleUserAsync.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(deleleUserAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Đã xóa thành công' });
      })
      .addCase(deleleUserAsync.rejected, (state, { payload }) => {
        notification.error({ message: 'Xóa thất bại' });
        state.pending = false;
      })
      //get all
      .addCase(getAllUserAsync.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(getAllUserAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.total = payload.total;
        state.page = payload.page;
        state.size = payload.size;
      })
      .addCase(getAllUserAsync.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //updateUser
      .addCase(updateUser.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        notification.success('cập nhật thông tin thành công');
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //getUserProfile
      .addCase(getUserProfile.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.pending = false;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectUser = (state) => state.user.data;
export const selectUserPage = (state) => state.user.page;
export const selectUserSizePage = (state) => state.user.size;
export const selectUserTotalRow = (state) => state.user.total;
export const selectUserPending = (state) => state.user.pending;

export default userSlice.reducer;
