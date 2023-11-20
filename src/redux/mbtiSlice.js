import { message } from 'antd';
import mbtiApi from '../api/mbtiApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


// Tạo initialState cho slice
const initialState = {
  data: null, // Danh sách câu hỏi MBTI
  pending: false, // Trạng thái tải (pending, fulfilled, rejected)
  questionGroups: [],
  mbtiParams: { page: 1, size: 10, search: '' },
  metaData: { page: 1, size: 10, total: 1 },
  search: '',
};

// Async thunk để lấy danh sách nhóm câu hỏi MBTI
export const getMbtiQuestionGroup = createAsyncThunk(
  'mbti/fetchMBTIQuestionGroup',
  async (_, thunkApi) => {
    try {
      const rs = await mbtiApi.getQuestionGroups();
      return rs.data.data; // Đảm bảo kiểm tra API response và chọn dữ liệu cần thiết
    } catch (error) {
      // Xử lý lỗi và trả về thông báo hoặc giá trị mặc định
      return thunkApi.rejectWithValue(error.message);
    }
  },
);

// Tạo một async thunk để lấy danh sách câu hỏi MBTI
export const getMbtiQuestion = createAsyncThunk('mbti/fetchMBTIQuestions', async (_, thunkApi) => {
  try {
    const rs = await mbtiApi.getAllQuestion(thunkApi.getState().mbti.mbtiParams);
    return rs.data.data; // Đảm bảo kiểm tra API response và chọn dữ liệu cần thiết
  } catch (error) {
    // Xử lý lỗi và trả về thông báo hoặc giá trị mặc định
    return thunkApi.rejectWithValue(error.message);
  }
});

// Tạo một async thunk thêm câu hỏi MBTI
export const addNewMbti = createAsyncThunk('mbti/addNewMbti', async (data, { rejectWithValue }) => {
  try {
    const rs = await mbtiApi.addNewMbti(data);
    return rs.data.data; // Đảm bảo kiểm tra API response và chọn dữ liệu cần thiết
  } catch (err) {
    // Xử lý lỗi và trả về thông báo hoặc giá trị mặc định
    if (err.response && err.response.data.message) {
      throw rejectWithValue(err.response.data.message);
    } else {
      throw rejectWithValue(err.message);
    }
  }
});

// Tạo một async thunk cập nhật câu hỏi MBTI
export const updateMbti = createAsyncThunk('mbti/UpdateMbti', async (data, { rejectWithValue }) => {
  try {
    const rs = await mbtiApi.updateMbti(data);
    return rs.data.data; // Đảm bảo kiểm tra API response và chọn dữ liệu cần thiết
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Tạo một async thunk xoá câu hỏi MBTI
export const deleteMbti = createAsyncThunk('mbti/deleteMbti', async (id, { rejectWithValue }) => {
  try {
    const rs = await mbtiApi.addNewMbti();
    return rs.data.data; // Đảm bảo kiểm tra API response và chọn dữ liệu cần thiết
  } catch (err) {
    // Xử lý lỗi và trả về thông báo hoặc giá trị mặc định
    if (err.response && err.response.data.message) {
      throw rejectWithValue(err.response.data.message);
    } else {
      throw rejectWithValue(err.message);
    }
  }
});

// Tạo slice
const mbtiSlice = createSlice({
  name: 'mbti',
  initialState,
  reducers: {
    setParams: (state, action) => {
      state.mbtiParams = { ...state.mbtiParams, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      //trạng thái của getMbtiQuestion pending - fulfilled - rejected
      .addCase(getMbtiQuestionGroup.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMbtiQuestionGroup.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.questionGroups = payload; // Lưu danh sách câu hỏi MBTI
      })
      .addCase(getMbtiQuestionGroup.rejected, (state, { payload }) => {
        console.log(payload);
        state.pending = false;
      })
      //trạng thái của getMbtiQuestion pending - fulfilled - rejected
      .addCase(getMbtiQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMbtiQuestion.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload; // Lưu danh sách câu hỏi MBTI
        state.metaData = { page: payload.page, size: payload.size, total: payload.total };
      })
      .addCase(getMbtiQuestion.rejected, (state, { payload }) => {
        console.log(payload);
        state.pending = false;
      })
      //trạng thái của addNewMbti pending - fulfilled - rejected
      .addCase(addNewMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(addNewMbti.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.pending = false;
        message.success('Tạo câu hỏi thành công', 3);
      })
      .addCase(addNewMbti.rejected, (state, { payload }) => {
        state.pending = false;
        message.error(payload, 3);
      })
      //trạng thái của updateMbti pending - fulfilled - rejected
      .addCase(updateMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateMbti.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.pending = false;
        message.success('Cập nhật hỏi thành công', 3);
      })
      .addCase(updateMbti.rejected, (state, { payload }) => {
        state.pending = false;
        message.error(payload, 3);
      })
      //trạng thái của deleteMbti pending - fulfilled - rejected
      .addCase(deleteMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        message.error('Xoá thành công', 3);
      })
      .addCase(deleteMbti.rejected, (state, { payload }) => {
        state.pending = false;
        message.error(payload, 3);
      });
  },
});
export const { setCurrentPage } = mbtiSlice.actions;
export const selectMbtiQuestions = (state) => state.mbti.data;
export const selectMbtiPending = (state) => state.mbti.pending;
export const selectMbtiToalRow = (state) => state.mbti.total;
export const selectMbtiPage = (state) => state.mbti.page;
export const selectMbtiPagesize = (state) => state.mbti.size;

export const { setParams } = mbtiSlice.actions;
export default mbtiSlice.reducer;