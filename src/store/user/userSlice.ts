import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { merge } from 'lodash';
import { UserModel } from './userModel'

interface UserState extends UserModel {}

const initialState: UserState = {
  _id: '',
  username: '',
  password: ''
}

export const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return merge({}, state, action.payload);
    },
  }
});

// user reducer
export default slice.reducer;

// ACTIONS
export const { setUser } = slice.actions;