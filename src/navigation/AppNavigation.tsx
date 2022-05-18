import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { App } from 'src/app';
import { AuthPage } from 'src/app/auth/AuthPage';
import { Routes as Path } from './Routes';
import { RequireAuth } from './RequireAuth';
import { PageLoader } from '../components/loader/PageLoader';

export interface AppNavigationProps {}

export const AppNavigation: React.FC<AppNavigationProps> = () => {
  return (
    <Routes>
      <Route path={Path.root} element={<App />}>
        <Route index element={<PageLoader />} />
        <Route path={Path.landing} element={<span>Landing</span>} />
        <Route path={Path.login} element={<AuthPage />} />

        <Route path={Path.feed} element={
          <RequireAuth>
            <span>Feed</span>
          </RequireAuth>
        }/>

        <Route path="*" element={<p>There s nothing here: 404!</p>} />
      </Route>
    </Routes>
  )
}
