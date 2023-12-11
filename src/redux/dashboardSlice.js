import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/userApi';
import { notification } from 'antd';

const initialState = {
  data: null
};

export const getCountAll = createAsyncThunk(
  'dashboard/getCountAll',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await userApi.getCountAll();
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
  name: 'dashboard',
  initialState,
  extraReducers: (builder) => {
    builder
      // get count All
      .addCase(getCountAll.pending, (state, { payload }) => {
        state.pending = true;
      })
      .addCase(getCountAll.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getCountAll.rejected, (state, { payload }) => {
        state.pending = false;
      });
  },
});

export const selectUser = (state) => state.user;

export default userSlice.reducer;
