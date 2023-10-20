import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    account_type: '',
    username: '',
    fullname: '',
    avatar: '',
    email: '',
    birthday: '',
    phone: '',
    address: '',
    role: '',
  },
  reducers: {
    update: (state, action) => {
      state.username = action.payload.username;
      state.fullname = action.payload.fullname;
      state.avatar = action.payload.avatar;
      state.email = action.payload.email;
      state.birthday = action.payload.birthday;
      state.phone = action.payload.phone;
      state.address = action.payload.address;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
