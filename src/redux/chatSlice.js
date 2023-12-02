import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import universityApi from '../api/universityApi';
import { notification } from 'antd/lib';
import faqsApi from '../api/faqsApi';
import chatApi from '../api/chatApi';

// Tạo initialState cho slice
const initialState = {
  messages: [],
  chats:[],
  page: 1,
  size: 10,
  total: 0,
  status: 'idle',  
};

// getMessagesByChatId
export const getMessageByChatId = createAsyncThunk(
  'university/getMessageByChatId',
  async (params, { rejectWithValue, getState }) => {
    try {
      const rs = await chatApi.getChatMessagesById(params);
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
        console.log("Doing condition...")    
        return getState().auth.isLogin;      
      },
  }
);


// Tạo slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
        //get all
      .addCase(getMessageByChatId.pending, (state) => {
        state.status = 'fetchingMesssages';
      })
      .addCase(getMessageByChatId.fulfilled, (state, { payload }) => {
        
        console.log(payload);
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
        state.messages=payload[0].Messages.reverse();
        state.status = 'idle';
        console.log(payload);
      })
      .addCase(getStudentMessageByChatId.rejected, (state, { payload }) => {
        state.pending = false;
        notification.error({ message: 'Lấy danh sách thất bại' });
      }) 
      
  },
});


export default chatSlice.reducer;
export const {} = chatSlice.actions;
