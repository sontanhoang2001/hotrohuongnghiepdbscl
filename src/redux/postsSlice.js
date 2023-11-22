import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';
import { notification } from 'antd/lib';
import faqsApi from '../api/faqsApi';
import postsApi from '../api/postsApi';

// Tạo initialState cho slice
const initialState = {
  data: null,
  pending: false,
  status: 'idle',
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
    search: '',
  },
  posts: [],
  currentPost: {},
};
// tạo bài viết
export const getAllPosts = createAsyncThunk(
  'university/getAllPosts',
  async (organizationId, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.getAll({ ...getState().posts.postsParams, organizationId });
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
// tạo bài viết
export const createPost = createAsyncThunk(
  'university/createPost',
  async (data, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.create(data);
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
// cập nhật bài viết
export const updatePost = createAsyncThunk(
  'university/updatePost',
  async (data, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.update(data);
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
// get by id
export const getPostById = createAsyncThunk(
  'university/getPostById',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.getById(params);
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
// delete by id
export const deletePost = createAsyncThunk(
  'university/deletePost',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.delete(params);
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
// restore by id
export const restorePost = createAsyncThunk(
  'university/restorePost',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await postsApi.restore(params);
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
  reducers: {
    clearCurrentPost: (state, action) => {
      state.currentPost = {};
    },
    setPostParams: (state, action) => {
      console.log('changed params', action.payload);
      state.postsParams = { ...state.postsParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      //restore
      .addCase(restorePost.pending, (state) => {
        state.status = 'restore';
      })
      .addCase(restorePost.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.currentPost = { ...state.currentPost, deletedAt: null };
        notification.success({ message: 'Đã khôi phục bài viết' });
        console.log(payload);
      })
      .addCase(restorePost.rejected, (state, { payload }) => {
        state.status = 'idle';
        notification.error({ message: 'Lỗi' });
      })
      //Delete
      .addCase(deletePost.pending, (state) => {
        state.status = 'delete';
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.currentPost = { ...state.currentPost, deletedAt: payload.data.deletedAt };
        notification.success({ message: 'Đã xóa bài viết' });

        console.log(payload);
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.status = 'idle';
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      //get post by id
      .addCase(getPostById.pending, (state) => {
        state.status = 'getpost';
      })
      .addCase(getPostById.fulfilled, (state, { payload }) => {
        state.currentPost = payload.data;
        state.status = 'idle';

        console.log(payload);
      })
      .addCase(getPostById.rejected, (state, { payload }) => {
        state.status = 'idle';
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      //get all post
      .addCase(getAllPosts.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.page = payload.page;
        state.size = payload.size;
        state.total = payload.total;
        state.posts = payload.data;
        console.log(payload);
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
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
      })
      //create update
      .addCase(createPost.pending, (state) => {
        state.pending = true;
        state.status = 'creating';
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';
        console.log(payload);
        notification.success({ message: 'Tạo bài viết thành công' });
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      // update
      .addCase(updatePost.pending, (state) => {
        state.pending = true;
        state.status = 'editing';
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';
        console.log(payload);
        notification.success({ message: 'Cập nhật bài viết thành công' });
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';
        notification.error({ message: 'Thất bại' });
      });
  },
});

export const {} = postsSlice.actions;
export const selectPublicPosts = (state) => state.posts.data;
export const selectClientPosts = (state) => state.posts.clientPosts;
export const selectPostsPending = (state) => state.posts.pending;

export default postsSlice.reducer;
export const { clearCurrentPost, setPostParams } = postsSlice.actions;
