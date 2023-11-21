import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';
import { notification } from 'antd/lib';

// Tạo initialState cho slice
const initialState = {
  data: null,
  pending: false,

  clientParams: {
    page: 1,
    size: 9,
    total: 0,
    type: 1,
    search: '',
  },
  organizationParams: {
    page: 1,
    size: 10,
    total: 0,
    search: '',
  },
  currentVerification: {},
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

// lấy  tổ chức  by id --admin
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
// lấy  tổ chức  by id --organization
export const getOneByOrganizationId = createAsyncThunk(
  'university/getOneByOrganizationId',
  async (id, { rejectWithValue }) => {
    try {
      const rs = await universityApi.getOneByOrganizationId(id);
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
  async ({ payload }, { rejectWithValue }) => {
    try {
      const rs = await universityApi.getAllUniversity(payload);
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
// Cập nhật thông tin tổ chức --organization
export const updateOrganization = createAsyncThunk(
  'university/updateOrganization',
  async (data, { rejectWithValue }) => {
    try {
      const rs = await universityApi.updateOrganizationInfoByOrg(data);
      return rs.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Lấy thông tin public của các trường đại học ---------------------
export const getAllPublicUniversityInfo = createAsyncThunk(
  'university/getAllPublicUniversityInfo',
  async (payload, { rejectWithValue }) => {
    try {
      const rs = await universityApi.getAllPublicUniversityInfo(payload);

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
const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    getClientParams: (state, action) => {
      state.clientParams = { ...state.clientParams, ...action.payload };
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
        notification.success({ message: 'Cập nhật trạng thái thành công' });
      })
      .addCase(updateVerificationStatus.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Cập nhật trạng thái thất bại' });
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
      //get by id -admin
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
      //get by id -organization
      .addCase(getOneByOrganizationId.pending, (state) => {
        state.pending = true;
      })
      .addCase(getOneByOrganizationId.fulfilled, (state, { payload }) => {
        state.pending = false;
        console.log(payload);
        state.organization = payload.data;
      })
      .addCase(getOneByOrganizationId.rejected, (state, { payload }) => {
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
        console.log(payload);
        notification.success({ message: "Cập nhật tổ chức thành công", duration: 3 });
      })
      .addCase(updateOrganization.rejected, (state, { payload }) => {
        state.pending = false;
        console.log(payload.message);

        notification.error({ message: payload, duration: 3 });
      }) //all public University
      .addCase(getAllPublicUniversityInfo.pending, (state) => {
        state.pending = true;
      })
      // ----------------------
      .addCase(getAllPublicUniversityInfo.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
        state.clientParams.page = payload.page;
        state.clientParams.size = payload.size;
        state.clientParams.total = payload.total;
        state.clientParams.search = payload.search;
        state.clientParams.type = payload.type;
      })
      .addCase(getAllPublicUniversityInfo.rejected, (state, { payload }) => {
        state.pending = false;
      });
  },
});
export const { getLocalOrganizationsById, getClientParams } = universitySlice.actions;
export const selectUniversity = (state) => state.university.data;
export const selectUniversityPending = (state) => state.university.pending;
export const selectclientParams = (state) => state.university.clientParams;
export const selectUniversityToalRow = (state) => state.university.total;
export const selectUniversityPage = (state) => state.university.page;
export const selectUniversityPagesize = (state) => state.university.size;

export default universitySlice.reducer;
