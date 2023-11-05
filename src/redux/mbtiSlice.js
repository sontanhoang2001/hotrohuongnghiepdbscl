import { message } from 'antd';
import mbtiApi from '../api/mbtiApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Tạo initialState cho slice
const initialState = {
  data: null, // Danh sách câu hỏi MBTI
  pending: false, // Trạng thái tải (pending, fulfilled, rejected)
  page: null,
  size: null,
  total: null,
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

// Tạo slice
const mbtiSlice = createSlice({
  name: 'mbti',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMbtiQuestion.pending, (state) => {
        state.pending = true;
      })
      .addCase(getMbtiQuestion.fulfilled, (state, { payload }) => {
        state.pending = false;
        const formatData = payload.data.map((item, idx) => {
          return {
            key: idx.toString(),
            question: item.question,
            // Answers1: Object.values(item.Answers[0]),
            Answers1: item.Answers[0].answer,
            vaule1: item.Answers[0].value,
            Answers2: item.Answers[1].answer,
            vaule2: item.Answers[1].value,
          };
        });
        state.data = formatData; // Lưu danh sách câu hỏi MBTI
        state.total = payload.total;
        state.page = payload.page;
        state.size = payload.size;
      })
      .addCase(getMbtiQuestion.rejected, (state, action) => {
        state.pending = false;
      });
  },
});

export const selectMBTIQuestions = (state) => state.mbti.data;
export const selectPending = (state) => state.mbti.pending;

export default mbtiSlice.reducer;
