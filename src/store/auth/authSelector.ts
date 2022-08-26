import { RootState } from 'src/store';

export const selectIsAuthenticated = (state: RootState) => state.auth.tokenData.token !== '';
