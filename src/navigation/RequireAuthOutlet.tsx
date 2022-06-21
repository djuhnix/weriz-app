import React, { useEffect } from 'react'
import { selectIsAuthenticated } from '../store/auth/authSelector'
import { selector } from 'src/store'
import { RequireAuthProps } from './RequireAuth'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Routes } from './Routes'

/**
 * Useful component to create a private route inside a route path
 * like
 * ```
 * <Route path="/private-outlet" element={<RequireAuthOutlet />}>
 *   <Route path="" element={<Private />} />
 * </Route>
 * ```
 * @constructor
 */
export const RequireAuthOutlet = (props: Pick<RequireAuthProps, 'redirectPath'>) => {
  const isAuth = selector(selectIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate(props.redirectPath || Routes.rootLogin, {replace: true});
    }
  });
  return <Outlet />;
};
