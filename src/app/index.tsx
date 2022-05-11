import React from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { selectIsAuthenticated } from 'src/store/auth/authSelector'
import { selector } from 'src/store'
import { Routes } from 'src/navigation/Routes'

export const App = () => {
  const isAuthenticated = selector(selectIsAuthenticated);
  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to={Routes.rootFeed} />;
  }
  // other case navigate to landing (create or join community)
  // -> registration
  return (
    <div className="App">
      <aside>{/*  */}</aside>
      <Container component="main" maxWidth="xs">
        <Outlet />
      </Container>
      <aside></aside>
    </div>
  )
}
