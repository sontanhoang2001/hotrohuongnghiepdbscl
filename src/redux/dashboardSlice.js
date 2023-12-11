import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dashboardApi from '../api/dashboard';

const initialState = {
  data: null,
  pending: false
};

export const getCountAll = createAsyncThunk(
  'dashboard/getCountAll',
  async (_, { rejectWithValue }) => {
    try {
      const rs = await dashboardApi.getAll();

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

export const dashboardSlice = createSlice({
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

export const selectDashboard = (state) => state.dashboard;
export default dashboardSlice.reducer;
