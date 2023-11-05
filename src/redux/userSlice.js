import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import { format } from 'date-fns';

const initialState = {
  data: null,
  pending: false,
  error: null,
  page: null,
  size: null,
  total: null,
};

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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllUserAsync.pending, (state, { payload }) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(getAllUserAsync.fulfilled, (state, { payload }) => {
        state.pending = false;
        const formatData = payload.data.map((item) => {
          return {
            key: item.id.toString(),
            id: item.id,
            account_type: item.account_type,
            status: item.status, // Thay thế giá trị tương ứng với account_type
            authCode: item.authCode,
            RoleId: item.RoleId,
            email: item.email,
            phone: item.phone,
            createdAt: format(new Date(item.createdAt), 'dd/MM/yyyy'),
            updatedAt: format(new Date(item.updatedAt), 'dd/MM/yyyy'),
          };
        });
        state.data = formatData;
        state.total = payload.total;
        state.page = payload.page;
        state.size = payload.size;
      })
      .addCase(getAllUserAsync.rejected, (state, { payload }) => {
        state.pending = false;
        state.error = payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectUser = (state) => state.user.data;
export const selectUserPage = (state) => state.user.page;
export const selectUserSizePage = (state) => state.user.size;
export const selectUserTotalRow = (state) => state.user.total;
export const selectPending = (state) => state.mbti.pending;

export default userSlice.reducer;
