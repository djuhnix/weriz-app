import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from "app";
import { Login } from "app/login/Login";

export interface AppNavigationProps {

}

export const AppNavigation: React.FC<AppNavigationProps> = (
  {}
) => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="landing" element={<span>Landing</span>} />
        <Route path="feed" element={<span>Feed</span>} />

      </Route>
    </Routes>
  );
}