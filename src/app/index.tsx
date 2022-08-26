import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {Container, Stack} from '@mui/material'
import { selectIsAuthenticated } from 'src/store/auth/authSelector'
import { selector } from 'src/store'
import { Routes } from 'src/navigation/Routes'
import { PrimaryAppBar } from "../components/header/PrimaryAppBar";
import { isMobile } from "react-device-detect";
import {makeStyles} from "tss-react/mui";
export const App = () => {
    const isAuthenticated = selector(selectIsAuthenticated);
    const navigate = useNavigate();
    /*useEffect(() => {
      if (isAuthenticated) {
        navigate(Routes.rootFeed);
      }
    }, []);
    */
    // other case navigate to landing (create or join community)
    // -> registration
    return (
        <Container sx={{ height: '100vh', padding: 4 }}>
            <Stack direction={ isMobile ? "column" : "row" } spacing={2}>
                <aside>
                    <PrimaryAppBar />
                </aside>
                <Container component="main" sx={{ padding: 0 }}>
                    <Outlet />
                </Container>
                <aside></aside>
            </Stack>
        </Container>
    )
}
