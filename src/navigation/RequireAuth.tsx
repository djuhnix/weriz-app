import React, { useEffect } from 'react'
import { selector } from 'src/store'
import { selectIsAuthenticated } from 'src/store/auth/authSelector'
import { Routes } from './Routes'
import { Navigate, useNavigate } from 'react-router-dom'

export interface RequireAuthProps {
  children: JSX.Element;
  redirectPath?: Routes;
}

export const RequireAuth = ({ children, redirectPath = Routes.rootLogin }: RequireAuthProps) => {
  const isAuth = selector(selectIsAuthenticated);
  const navigate = useNavigate();
  console.log('isAuth', isAuth);
  if (!isAuth) return <Navigate to={redirectPath} replace />;
  useEffect(() => {
    if (!isAuth) {
      navigate(redirectPath, {replace: true});
    }
  });
  return children;
};
