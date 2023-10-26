import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../api/user';

const initialState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};

export const getUserAsync = createAsyncThunk('users', async (rejectWithValue) => {
  try {
    const rs = await userApi.getAllUser();
    // The value we return becomes the `fulfilled` action payload
    const dataUser = {
      ...rs.data.data,
    };

    console.log('>>> rs', rs);
    console.log('>>> data', rs.data.data);

    return rs.data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state, { payload }) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
        state.success = true;
      })
      .addCase(getUserAsync.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectUser = (state) => state.data;

export default userSlice.reducer;
