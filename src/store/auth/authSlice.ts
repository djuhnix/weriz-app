import { createSlice } from '@reduxjs/toolkit'
import { AuthModel } from './authModel';
import { authApi } from './authApi';
import { UserModel } from '../user/userModel';
import { STORAGE } from 'src/enum/storage'
import store from 'store';
import { merge } from 'lodash'

interface AuthState extends AuthModel {
  user: Partial<UserModel>;
}

const initUser: Partial<UserModel> = store.get(STORAGE.USER);
const initTokenData: AuthModel['tokenData'] = store.get(STORAGE.TOKEN_DATA)

const initialState: AuthState = {
  user: initUser != undefined ? initUser : {
    _id: '',
  },
  tokenData: initTokenData != undefined ? initTokenData : {
    token: '',
    expiresIn: 0
  }
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
        console.log('authState', state);
        state = merge({}, state, action.payload.data);
        // save toke and user to storage
        // (cookies or localStorage, the lib decide
        store.set(STORAGE.USER, state.user);
        store.set(STORAGE.TOKEN_DATA, state.tokenData);
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