import { message } from 'antd';
import mbtiApi from '../api/mbtiApi';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Tạo initialState cho slice
const initialState = {
  questions: [], // Danh sách câu hỏi MBTI
  pending: false, // Trạng thái tải (pending, fulfilled, rejected)
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
        state.questions = payload; // Lưu danh sách câu hỏi MBTI
        // console.log('payload', payload);
      })
      .addCase(getMbtiQuestion.rejected, (state, action) => {
        state.pending = false;
      });
  },
});

// Export actions và selector (nếu cần)
export const {} = mbtiSlice.actions;
export const selectMBTIQuestions = (state) => state.mbti.questions;
export const selectPending = (state) => state.mbti.pending;

export default mbtiSlice.reducer;
