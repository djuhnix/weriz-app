import { baseQueryWithRetry } from 'src/store/query'
import { UserModel } from './userModel'
import { createApi } from '@reduxjs/toolkit/dist/query/react'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRetry,
  endpoints: (build) => ({
    getUsers: build.query<UserModel[], void>({
      query: () => 'user',
    }),
    getConnectedUser: build.query<UserModel, void>({
      query: () => 'user/connected',
    }),
  })
});

export const { useGetUsersQuery, useGetConnectedUserQuery } = userApi
