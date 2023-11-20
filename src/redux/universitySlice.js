import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';
import { notification } from 'antd/lib';

// Tạo initialState cho slice
const initialState = {
  data: null,
  pending: false,
  page: 1,
  size: 10,
  total: 0,
  organizationParams: {
    page: 1,
    size: 10,
    total: 0,
  },
  currentVerification:{},
  verifications: [],
  organization: {},
  joinedOrganizations: [],
};
// danh sách yêu cầu xác thực
export const getAllOrganizationVerification = createAsyncThunk(
  'university/getAllOrganizationVerification',
  async (_, { rejectWithValue, getState }) => {
    try {
      const rs = await universityApi.getVerificationRequests(
        getState().university.organizationParams,
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
// danh sách tổ chức đang quản lý
export const getAllOrganizationsByUser = createAsyncThunk(
  'university/getAllOrganizationsByUser',
  async (_, { rejectWithValue }) => {
    try {
      const rs = await universityApi.getAllOrganizationsByUser();
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

// lấy  tổ chức đang quản lý by id
export const getOrganizationsById = createAsyncThunk(
  'university/getOrganizationsById',
  async (id, { rejectWithValue }) => {
    try {
      const rs = await universityApi.getOrganizationById(id);
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
// danh sách tổ chức
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

// xóa tổ chức
export const deleteOrganization = createAsyncThunk(
  'university/deleteOrganization',
  async (id, { rejectWithValue }) => {
    try {
      const rs = await universityApi.deleteUniversity(id);
      return rs.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// Cập nhật trạng thái xác thực
export const updateVerificationStatus = createAsyncThunk(
  'university/updateVerificationStatus',
  async (data, { rejectWithValue }) => {
    try {
      const rs = await universityApi.updateVerificationStatus(data);
      return rs.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// Cập nhật thông tin tổ chức
export const updateOrganization = createAsyncThunk(
  'university/updateOrganization',
  async (data, { rejectWithValue }) => {
    try {
      const rs = await universityApi.updateOrganizationInfo(data);
      return rs.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Tạo slice
const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    getLocalOrganizationsById: (state, action) => {
      state.currentVerification = state.verifications.find((record) => record.id === action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //verification update
      .addCase(updateVerificationStatus.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateVerificationStatus.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({message:'Cập nhật trạng thái thành công'});
      })
      .addCase(updateVerificationStatus.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({message:'Cập nhật trạng thái thất bại'});
      })
      //verification requests
      .addCase(getAllOrganizationVerification.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllOrganizationVerification.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.page = payload.page;
        state.size = payload.size;
        state.total = payload.total;
        state.verifications = payload.data;
      })
      .addCase(getAllOrganizationVerification.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //all by user
      .addCase(getAllOrganizationsByUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllOrganizationsByUser.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.page = payload.page;
        state.size = payload.size;
        state.total = payload.total;
        state.joinedOrganizations = payload.data;
      })
      .addCase(getAllOrganizationsByUser.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //get by id
      .addCase(getOrganizationsById.pending, (state) => {
        state.pending = true;
      })
      .addCase(getOrganizationsById.fulfilled, (state, { payload }) => {
        state.pending = false;
        console.log(payload);
        state.organization = payload.data;
      })
      .addCase(getOrganizationsById.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //all
      .addCase(getAllUniversity.pending, (state) => {
        state.pending = true;
      })
      .addCase(getAllUniversity.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.total = payload.total;
        state.page = payload.page;
        state.size = payload.size;
      })
      .addCase(getAllUniversity.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //delete
      .addCase(deleteOrganization.pending, (state) => {
        state.pending = true;
      })
      .addCase(deleteOrganization.fulfilled, (state, { payload }) => {
        state.pending = false;
        console.log(payload);
        notification.success({ message: payload.message, duration: 3 });
      })
      .addCase(deleteOrganization.rejected, (state, { payload }) => {
        state.pending = false;
      })
      //update
      .addCase(updateOrganization.pending, (state) => {
        state.pending = true;
      })
      .addCase(updateOrganization.fulfilled, (state, { payload }) => {
        state.pending = false;
        notification.success({ message: payload.message, duration: 3 });
      })
      .addCase(updateOrganization.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: payload, duration: 3 });
      });
  },
});
export const selectUniversity = (state) => state.university.data;
export const selectUniversityPending = (state) => state.university.pending;
export const selectUniversityToalRow = (state) => state.university.total;
export const selectUniversityPage = (state) => state.university.page;
export const selectUniversityPagesize = (state) => state.university.size;
export default universitySlice.reducer;
export const {getLocalOrganizationsById}=universitySlice.actions;
