import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'src/store/auth/authSlice';
import userReducer from 'src/store/user/userSlice';
import { authApi } from './auth/authApi'
import { userApi } from './user/userApi'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    // API (rtk-query)
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,

    // Slice generated reducer
    auth: authReducer,
    user: userReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  middleware: (getDefaultMiddleware) => {
    console.log('auth middleware', authApi.middleware);
    return getDefaultMiddleware().concat(authApi.middleware, userApi.middleware)
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, user: UsersState}
export type AppDispatch = typeof store.dispatch

// hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const selector = useAppSelector;

// export default store;
