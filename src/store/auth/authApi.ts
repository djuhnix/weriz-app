import { baseQueryWithRetry } from 'src/store/query'
import { UserModel } from '../user/userModel'
import { AuthModel } from './authModel'
import { createApi } from '@reduxjs/toolkit/query/react'

export type Credentials = Pick<UserModel, 'email' | 'password'>

export type AuthResponse = {
  user: UserModel;
  tokenData: AuthModel['tokenData'];
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, Credentials>({
      query: (credentials: Credentials) => ({ url: 'login', method: 'POST', body: credentials }),
    }),
    signup: build.mutation<UserModel & AuthModel, Credentials>({
      query: (credentials: Credentials) => ({ url: 'signup', method: 'POST', body: credentials }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi