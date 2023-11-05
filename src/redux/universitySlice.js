import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import university from '../api/universityApi';

// Tạo initialState cho slice
const initialState = {
  data: null,
  pending: false,
  page: null,
  size: null,
  total: null,
};
// Tạo một async thunk để lấy danh sách cac truong
export const getAllUniversity = createAsyncThunk(
  'university/getAllUniversity',
  async ({ page, size }) => {
    try {
      const rs = await university.getAllUniversity(page, size);
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
  name: 'university',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUniversity.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllUniversity.fulfilled, (state, { payload }) => {
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
      .addCase(getAllUniversity.rejected, (state, action) => {
        state.pending = false;
      });
  },
});
export const selectUniversity = (state) => state.university.data;
export const selectPending = (state) => state.university.pending;
export default mbtiSlice.reducer;
