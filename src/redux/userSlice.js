import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const getAllUserAsync = createAsyncThunk(
  'user/getAllUser',
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const rs = await userApi.getAllUser(page, size);

      return rs.data.data.data;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.success = true;
      })
      .addCase(getAllUserAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectUser = (state) => state.user.data;

export default userSlice.reducer;
