import React from 'react'
import { selector } from 'src/store'
import { selectIsAuthenticated } from 'src/store/auth/authSelector'
import { Routes } from './Routes'
import { Navigate } from 'react-router-dom'

export interface RequireAuthProps {
  children: JSX.Element;
  redirectPath?: Routes;
}

export const RequireAuth = ({ children, redirectPath = Routes.login }: RequireAuthProps) => {
  const isAuth = selector(selectIsAuthenticated);
  if (!isAuth) return <Navigate to={redirectPath} replace />;
  return isAuth
    ? children
    : <Navigate to={redirectPath} replace />;
};
