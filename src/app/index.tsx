import React from 'react';
import { Outlet } from "react-router-dom";
import {Container} from "@mui/material";

export const App = () => {
  // if user logged in navigate to 'feed'
  // if user not logged in navigate to 'login'
  // else navigate to landing (create or join community)
  // -> registration
  return (
    <div className="App">
      <aside>
        {/*  */}
      </aside>
      <Container component="main" maxWidth="xs">
        <Outlet/>
      </Container>
      <aside>

      </aside>
    </div>
  );
}
