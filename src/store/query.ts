// initialize an empty api service that we'll inject endpoints into later as needed
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { Config } from 'src/config';
import { RootState } from 'src/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: Config.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.tokenData.token

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
});

export type ApiResponse<Data> = {
  message: string;
  data: Data;
}

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 3 });