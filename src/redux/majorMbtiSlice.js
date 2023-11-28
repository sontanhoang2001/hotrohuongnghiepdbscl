import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import { format } from 'date-fns';
import { notification } from 'antd';
import majorMbtiApi from '../api/majorMbtiApi';

const initialState = {
  data: [],
  pending: false,
  page: 1,
  size: 10,
  total: 1,
  mbtiParams: { page: 1, size: 10, total: 1, organizationId: '', mbtiId: '' },
};
//get all
export const getAllMajorMbti = createAsyncThunk(
  'posts/getAllMajorMbti',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await majorMbtiApi.getAllMajorMbti(payload);
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
//create new
export const createMajorMbti = createAsyncThunk(
  'posts/createMajorMbti',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await majorMbtiApi.createMajorMbti(payload);
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
//update
export const updateMajorMbti = createAsyncThunk(
  'university/updateMajorMbti',
  async (data, { rejectWithValue, getState }) => {
    try {
      const rs = await majorMbtiApi.updateMajorMbti(data);
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
export const deleteMajorMbti = createAsyncThunk(
  'posts/deleteMajorMbti',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await majorMbtiApi.deleteMajorMbti(payload);
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
//restore
export const restoreMajorMbti = createAsyncThunk(
  'posts/restoreMajorMbti',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await majorMbtiApi.restoreMajorMbti(payload);
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

//get by id
export const getMajorMbtiById = createAsyncThunk(
  'posts/getMajorMbtiById',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await majorMbtiApi.getMajorMbtiById(payload);
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
  name: 'majorMbti',
  initialState,
  extraReducers: (builder) => {
    builder
      //restoreUserAsync
      .addCase(getAllMajorMbti.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(getAllMajorMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload.data;
        state.mbtiParams = {
          ...state.mbtiParams,
          page: payload.page,
          size: payload.size,
          total: payload.total,
        };
        // notification.success({ message: 'Khôi phục thành công' });
      })
      .addCase(getAllMajorMbti.rejected, (state, { payload }) => {
        // notification.error({ message: 'Khôi phục thất bại' });
        state.pending = false;
      })
      //create
      .addCase(createMajorMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(createMajorMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Thêm ngành thành công', duration: 3 });
      })
      .addCase(createMajorMbti.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: payload, duration: 3 });
      })
      //update
      .addCase(updateMajorMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateMajorMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Cập nhật ngành nghề thành công' });
      })
      .addCase(updateMajorMbti.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Thất bại' });
      })
      //restore
      .addCase(restoreMajorMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(restoreMajorMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Khôi phục thành công' });
      })
      .addCase(restoreMajorMbti.rejected, (state, { payload }) => {
        state.status = 'idle';
        state.pending = false;
        notification.error({ message: 'Thất bại' });
      })
      //delete
      .addCase(deleteMajorMbti.pending, (state) => {
        state.pending = true;
        state.status = 'processing';
      })
      .addCase(deleteMajorMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Xóa thành công' });
      })
      .addCase(deleteMajorMbti.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Thất bại' });
      }) //get by id
      .addCase(getMajorMbtiById.pending, (state) => {
        state.pending = true;
        state.status = 'processing';
      })
      .addCase(getMajorMbtiById.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        console.log(payload);
      })
      .addCase(getMajorMbtiById.rejected, (state, { payload }) => {
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
