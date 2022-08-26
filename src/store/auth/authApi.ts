import { ApiResponse, baseQuery } from 'src/store/query'
import { UserModel } from '../user/userModel'
import { AuthModel } from './authModel'
import { createApi } from '@reduxjs/toolkit/query/react'

export type Credentials = Pick<UserModel, 'username' | 'email' | 'password' >
export type Email = Pick<UserModel, 'email' >
export type ResetPassword = Pick<UserModel, 'password' > & { token: string }

export type AuthResponse = ApiResponse<{
  user: UserModel;
  tokenData: AuthModel['tokenData'];
}>


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, Credentials>({
      query: (credentials: Credentials) => ({ url: 'auth/login', method: 'POST', body: credentials }),
    }),
    signup: build.mutation<AuthResponse, Credentials>({
      query: (credentials: Credentials) => ({ url: 'auth/signup', method: 'POST', body: credentials }),
    }),
    forgotPassword: build.mutation<ApiResponse<boolean>, Email>({
      query: (email: Email) => ({ url: 'auth/forgot-password', method: 'POST', body: email }),
    }),
    resetPassword: build.mutation<ApiResponse<UserModel>, ResetPassword>({
      query: (resetPassword: ResetPassword) => ({ url: 'auth/reset-password', method: 'POST', body: resetPassword }),
    }),
  }),
});

// export type LoginMutation = typeof authApi.endpoints.login.useMutation;
export const { useLoginMutation, useSignupMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi