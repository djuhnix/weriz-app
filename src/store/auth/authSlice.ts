import { createSlice } from '@reduxjs/toolkit'
import { AuthModel } from './authModel';
import { authApi } from './authApi';
import { UserModel } from '../user/userModel';

interface AuthState extends AuthModel {
  user: Partial<UserModel>;
}

const initialState: AuthState = {
  user: {
    _id: '',
  },
  tokenData: {
    token: '',
    expiresIn: 0,
  },
  isAuthenticated: false
}

export const slice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state, action) => {
        console.log('pending', action);
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log('fulfilled', action);
        state.isAuthenticated = true;
        state.tokenData = action.payload.tokenData;
        state.user = action.payload.user;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        console.log('rejected', action);
      });
  }
});

// auth reducer
export default slice.reducer;

// ACTIONS
export const { logout } = slice.actions;