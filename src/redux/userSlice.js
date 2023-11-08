import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import { format } from 'date-fns';

const initialState = {
  data: null,
  pending: false,
  page: 1,
  size: 10,
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
