import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';
import { notification } from 'antd/lib';
import faqsApi from '../api/faqsApi';

// Tạo initialState cho slice
const initialState = {
  data: null,
  pending: false,
  page: 1,
  size: 10,
  total: 0,
  postsParams: {
    page: 1,
    size: 10,
    total: 0,
  },
  posts:[]
 
};
// danh sách yêu cầu xác thực
export const getAllFAQS = createAsyncThunk(
  'university/getAllFAQS',
  async (_, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.getAll(
        getState().posts.postsParams,
      );
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
    
  },
  extraReducers: (builder) => {
    builder
      //verification update
      .addCase(getAllFAQS.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllFAQS.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.page=payload.page;
        state.size=payload.size;
        state.total=payload.total;
        state.faqs=payload.data;
        console.log(payload);        
       
      })
      .addCase(getAllFAQS.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({message:'Lấy danh sách thất bại'});
      })
      
  },
});

export default postsSlice.reducer;
export const {}=postsSlice.actions;
