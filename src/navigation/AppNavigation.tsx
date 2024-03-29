import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { App } from 'src/app';
import { AuthPage } from 'src/app/auth/AuthPage';
import { Routes as Path } from './Routes';
import { RequireAuth } from './RequireAuth';
import {ForgotPassword} from "../app/auth/ForgotPassword";
import FeedPage from "../app/feed/FeedPage";

export interface AppNavigationProps {
  hideLoader: () => void;
  showLoader?: () => void;
}

export const AppNavigation: React.FC<AppNavigationProps> = ({ hideLoader }) => {
  useEffect(hideLoader, []);

  return (
    <Routes>
      <Route path={Path.root} element={<App />}>
        <Route index element={<AuthPage/>} />
        <Route path={Path.landing} element={<span>Landing</span>} />
        <Route path={Path.login} element={<AuthPage mode="login"/>} />
        <Route path={Path.signup} element={<AuthPage mode="signup"/>} />
        <Route path={Path.forgotPassword} element={<ForgotPassword/>} />
        <Route path={Path.resetPassword} element={<ForgotPassword mode="reset"/>} />

        <Route path={Path.feed} element={
          <RequireAuth>
            <FeedPage />
          </RequireAuth>
        }/>

        <Route path="*" element={<p>There s nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
}
