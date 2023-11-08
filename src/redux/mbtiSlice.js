import { message } from 'antd';
import mbtiApi from '../api/mbtiApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Tạo initialState cho slice
const initialState = {
  data: null, // Danh sách câu hỏi MBTI
  pending: false, // Trạng thái tải (pending, fulfilled, rejected)
  page: 1,
  size: 10,
  total: 1,
};

// Tạo một async thunk để lấy danh sách câu hỏi MBTI
export const getMbtiQuestion = createAsyncThunk(
  'mbti/fetchMBTIQuestions',
  async ({ page, size }) => {
    try {
      const rs = await mbtiApi.getAllQuestion(page, size);

      return rs.data.data; // Đảm bảo kiểm tra API response và chọn dữ liệu cần thiết
    } catch (error) {
      // Xử lý lỗi và trả về thông báo hoặc giá trị mặc định
      if (error.response && error.response.data) {
        throw console.log(error.response.data.message);
      } else {
        throw console.log(error.message);
      }
    }
  },
);

// Tạo một async thunk thêm câu hỏi MBTI
export const addNewMbti = createAsyncThunk('mbti/addNewMbti', async ({}, { rejectWithValue }) => {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      //trạng thái của getMbtiQuestion pending - fulfilled - rejected
      .addCase(getMbtiQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMbtiQuestion.fulfilled, (state, { payload }) => {
        state.pending = false;
        // const formatData = payload.data.map((item, idx) => {
        //   var answers = item.Answers.map(function (item) {
        //     return {
        //       label: item.answer,
        //       value: item.answer,
        //     };
        //   });
        //   var vaule = item.Answers.map(function (item) {
        //     return {
        //       label: item.value,
        //       value: item.value,
        //     };
        //   });
        //   return {
        //     key: idx.toString(),
        //     id: item.id,
        //     question: item.question,
        //     answers: answers,
        //     value: vaule,
        //   };
        // });
        state.data = payload; // Lưu danh sách câu hỏi MBTI
        state.total = payload.total;
        state.page = payload.page;
        state.size = payload.size;
        console.log(payload);
      })
      .addCase(getMbtiQuestion.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //trạng thái của addNewMbti pending - fulfilled - rejected
      .addCase(addNewMbti.pending, (state) => {
        state.pending = true;
      })
      .addCase(addNewMbti.fulfilled, (state, { payload }) => {
        state.pending = false;
        message.error('Xoá thành công', 3);
      })
      .addCase(addNewMbti.rejected, (state, { payload }) => {
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

export default mbtiSlice.reducer;
