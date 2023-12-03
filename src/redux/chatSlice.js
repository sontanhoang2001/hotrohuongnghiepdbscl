import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notification } from 'antd/lib';
import chatApi from '../api/chatApi';

// Tạo initialState cho slice
const initialState = {

  //For org
  chats: [],
  orgCurrentChatId:0,
  orgMessages:[],
  currentOrgChatMessagesCount:0,
  orgCurrentUserAvatar:'',
  orgCurrentUserName:'',
  orgCurrentUserId:'',
  // End for org

  // For student
  currentChatId: 0,
  messages: [],
  currentChatMessagesCount: 0,
  currentOrgId: 0,
  currentOrgName: '',
  currentOrgAvt: '',
  // End for student
  page: 1,
  size: 10,
  total: 0,
  status: 'idle',
};
//////For Org
export const getAllOrgChats = createAsyncThunk(
  'university/getAllOrgChats',
  async ({organizationId,page,size,search}, { rejectWithValue, getState }) => {
    try {
      const rs = await chatApi.getAllChatsOrgId({organizationId,page,size,search});
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
// getMessagesByChatId
export const getMessageByChatId = createAsyncThunk(
  'university/getMessageByChatId',
  async ({chatId,beforeId}, { rejectWithValue, getState }) => {
    try {
      const rs = await chatApi.getChatMessagesById({chatId,beforeId});
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


//////For Student

// getStudentMessagesByChatId
export const getStudentMessageByChatId = createAsyncThunk(
  'university/getStudentMessageByChatId',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await chatApi.getCustomerChatMessages(params);
      return rs.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
  {
    condition: (params, { getState }) => {
      // console.log("Doing condition...")
      return getState().auth.isLogin;
    },
  },
);

// loadMoreStudentMessageByChatId
export const loadMoreStudentMessageByChatId = createAsyncThunk(
  'university/loadMoreStudentMessageByChatId',
  async (_, { rejectWithValue, getState }) => {
    try {
      const rs = await chatApi.getCustomerChatMessages({
        organizationId: getState().chat.currentOrgId,
        beforeId: getState().chat.messages[0].id,
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
  {
    condition: (params, { getState }) => {
      // console.log("Doing condition...")
      return getState().auth.isLogin;
    },
  },
);

// Tạo slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    pushMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    pushOrgMessage: (state, { payload }) => {
      state.orgMessages = [...state.orgMessages, payload];
    },
    setCurrentOrgId: (state, { payload }) => {
      state.currentOrgId = payload;
    },
    setCurrentOrgUserChatInfo: (state, { payload }) => {
      state.orgCurrentUserAvatar = payload.orgCurrentUserAvatar;
      state.orgCurrentUserName = payload.orgCurrentUserName;
      state.orgCurrentUserId = payload.orgCurrentUserId;
      state.orgCurrentChatId=payload.chatId;
    },
  },
  extraReducers: (builder) => {
    builder
      //get all org chat messages
      .addCase(getMessageByChatId.pending, (state) => {
        state.status = 'fetchingMesssages';
      })
      .addCase(getMessageByChatId.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        state.orgMessages=payload.data[0].Messages.reverse();
        state.currentOrgChatMessagesCount=payload.total;
        console.log("fetch by id:",payload);
      })
      .addCase(getMessageByChatId.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      //get messages for customer
      .addCase(getStudentMessageByChatId.pending, (state) => {
        state.status = 'fetchingMesssages';
      })
      .addCase(getStudentMessageByChatId.fulfilled, (state, { payload }) => {
        state.messages = payload.data[0].Messages.reverse();
        state.currentOrgId = payload.data[0].organizationId;
        state.currentChatId = payload.data[0].id;
        state.currentOrgName = payload.data[0].organizationName;
        state.currentOrgAvt = payload.data[0].organizationAvatar;
        state.currentChatMessagesCount = payload.total;
        state.status = 'idle';
        console.log(payload);
      })
      .addCase(getStudentMessageByChatId.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      //Load more customer message
      .addCase(loadMoreStudentMessageByChatId.pending, (state) => {
        state.status = 'fetchingMesssages';
      })
      .addCase(loadMoreStudentMessageByChatId.fulfilled, (state, { payload }) => {
        state.messages = [...payload.data[0].Messages, ...state.messages];
        // state.currentOrgId = payload.data[0].organizationId;
        // state.currentChatId = payload.data[0].id;
        // state.currentOrgName = payload.data[0].organizationName;
        // state.currentOrgAvt = payload.data[0].organizationAvatar;
        // state.currentChatMessagesCount = payload.total;
        state.status = 'idle';
        console.log('Load more', payload);
      })
      .addCase(loadMoreStudentMessageByChatId.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      })
      //Get all org chats
      .addCase(getAllOrgChats.pending, (state) => {
        state.status = 'fetchingChats';
      })
      .addCase(getAllOrgChats.fulfilled, (state, { payload }) => {
        state.chats = payload.data.reverse();
        state.status = 'idle';
        
      })
      .addCase(getAllOrgChats.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      });
  },
});

export default chatSlice.reducer;
export const { pushMessage, setCurrentOrgId,setCurrentOrgUserChatInfo,pushOrgMessage } = chatSlice.actions;
