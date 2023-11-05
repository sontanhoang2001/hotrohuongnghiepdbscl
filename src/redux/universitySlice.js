import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';

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
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const rs = await universityApi.getAllUniversity(page, size);
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
            id: item.UniversityDetail.id,
            name: item.name,
            image: item.UniversityDetail.image,
            address: item.UniversityDetail.address,
            province: item.UniversityDetail.province,
            email: item.UniversityDetail.email,
            phone: item.UniversityDetail.phone,
            lat: item.UniversityDetail.lat,
            long: item.UniversityDetail.long,
            description: item.UniversityDetail.description,
            url: item.UniversityDetail.url,
            rank: item.UniversityDetail.rank,
            // UniversityDetail: Object.values(item.UniversityDetail),
          };
        });
        // console.log(formatData);
        state.data = formatData;
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
