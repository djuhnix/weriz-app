import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { selectIsAuthenticated } from 'src/store/auth/authSelector'
import { selector } from 'src/store'
import { Routes } from 'src/navigation/Routes'

export const App = () => {
  const isAuthenticated = selector(selectIsAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate(Routes.rootFeed);
    }
  }, []);
  // other case navigate to landing (create or join community)
  // -> registration
  return (
    <>
      <aside>{/*  */}</aside>
      <Container component="main" maxWidth="xs">
        <Outlet />
      </Container>
      <aside></aside>
    </>
  )
}
