import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  pending: false,
  organizationParams: {
    page: 1,
    size: 10,
    total: 0,
  },
};

export const getAllPublicUniversityInfo = createAsyncThunk(
  'posts/getAllPublicUniversityInfo',
  async ({ page, size }, { rejectWithValue }) => {
    try {
      //   const rs = await getAllPublicPost.getAllPublicUniversityInfo(page, size);

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
