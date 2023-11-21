import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';
import { notification } from 'antd/lib';
import postsApi from '../api/postsApi';

// Tạo initialState cho slice
const initialState = {
  data: null,
  pending: false,
  page: 1,
  size: 10,
  total: 0,
  clientPosts: {
    page: 1,
    size: 3,
    search: '',
    total: 0,
  },
  postsParams: {
    page: 1,
    size: 10,
    total: 0,
  },
  posts: [],
};
// danh sách yêu cầu xác thực
export const getAllFAQS = createAsyncThunk(
  'university/getAllFAQS',
  async (_, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.getAll(getState().posts.postsParams);
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

// Lấy thông tin public của posts -------------
export const getAllPublicPosts = createAsyncThunk(
  'posts/getAllPublicPosts',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await postsApi.getAllPublicPosts(payload);
      console.log('payload contruct', payload);
      console.log('payload', rs.data);
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

// Tạo slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //verification update
      .addCase(getAllFAQS.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllFAQS.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.page = payload.page;
        state.size = payload.size;
        state.total = payload.total;
        state.faqs = payload.data;
        console.log(payload);
      })
      .addCase(getAllFAQS.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      //all public posts
      .addCase(getAllPublicPosts.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllPublicPosts.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.clientPosts.page = payload.page;
        state.clientPosts.size = payload.size;
        state.clientPosts.total = payload.total;
        state.clientPosts.search = payload.search;
      })
      .addCase(getAllPublicPosts.rejected, (state, { payload }) => {
        state.pending = false;
      });
  },
});

export const {} = postsSlice.actions;
export const selectPublicPosts = (state) => state.posts.data;
export const selectClientPosts = (state) => state.posts.clientPosts;
export const selectPostsPending = (state) => state.posts.pending;

export default postsSlice.reducer;
