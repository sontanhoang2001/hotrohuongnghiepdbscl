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
  status: 'idle',
  faqsParams: {
    page: 1,
    size: 10,
    total: 0,
    search: '',
  },
  faqs: [],
  currentFaqs: {},
};
// create
export const createFaqs = createAsyncThunk(
  'university/createFaqs',
  async (data, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.create(data);
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
// create
export const updateFaqs = createAsyncThunk(
  'university/updateFaqs',
  async (data, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.update(data);
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
// get by id
export const getFAQSById = createAsyncThunk(
  'university/getFAQSById',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.getById(params);
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
// getall
export const getAllFAQS = createAsyncThunk(
  'university/getAllFAQS',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.getAll({
        ...getState().faqs.faqsParams,
        ...params,
      });
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
// delete
export const deleteFaqs = createAsyncThunk(
  'university/deleteFaqs',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.delete(params);
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
// restore
export const restoreFaqs = createAsyncThunk(
  'university/restoreFaqs',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await faqsApi.restore(params);
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
export const getAllPublicFaqsApi = createAsyncThunk(
  'faqs/getAllPublicFaqsApi',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await faqsApi.getAllPublicFaqsApi(payload);
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
const faqsSlice = createSlice({
  name: 'faqs',
  initialState,
  reducers: {
    setFaqsParams: (state, action) => {
      state.faqsParams = { ...state.faqsParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      //restore
      .addCase(restoreFaqs.pending, (state) => {
        state.pending = true;
        state.status = 'processing';
      })
      .addCase(restoreFaqs.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';
        notification.success({ message: 'Khôi phục câu hỏi thành công' });
        console.log(payload);
      })
      .addCase(restoreFaqs.rejected, (state, { payload }) => {
        state.status = 'idle';
        state.pending = false;
        notification.error({ message: 'Thất bại' });
      })
      //delete
      .addCase(deleteFaqs.pending, (state) => {
        state.pending = true;
        state.status = 'processing';
      })
      .addCase(deleteFaqs.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';

        notification.success({ message: 'Xóa câu hỏi thành công' });
        console.log(payload);
      })
      .addCase(deleteFaqs.rejected, (state, { payload }) => {
        state.pending = false;
        state.status = 'idle';

        notification.error({ message: 'Thất bại' });
      })
      //update
      .addCase(updateFaqs.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateFaqs.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Cập nhật câu hỏi thành công' });
        console.log(payload);
      })
      .addCase(updateFaqs.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Thất bại' });
      })
      //create
      .addCase(createFaqs.pending, (state) => {
        state.pending = true;
      })
      .addCase(createFaqs.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: 'Tạo câu hỏi thành công' });
        console.log(payload);
      })
      .addCase(createFaqs.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy thông tin thất bại' });
      })
      //get by id
      .addCase(getFAQSById.pending, (state) => {
        state.pending = true;
      })
      .addCase(getFAQSById.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.currentFaqs = payload.data;
        console.log(payload);
      })
      .addCase(getFAQSById.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy thông tin thất bại' });
      })
      //get all
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
      }) //get all public faqs
      .addCase(getAllPublicFaqsApi.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllPublicFaqsApi.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.faqsParams.page = payload.page;
        state.faqsParams.size = payload.size;
        state.faqsParams.total = payload.total;
        state.data = payload;
      })
      .addCase(getAllPublicFaqsApi.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      });
  },
});

export const selectPublicFAQS = (state) => state.faqs.data;
export const selectFAQSPending = (state) => state.faqs.pending;
export const selectFAQSParamsClient = (state) => state.faqs.faqsParams;

export default faqsSlice.reducer;
export const { setFaqsParams } = faqsSlice.actions;
