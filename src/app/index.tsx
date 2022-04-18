import React from 'react';
import { Outlet } from "react-router-dom";

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
      <main>
        <Outlet/>
      </main>
      <aside>

      </aside>
    </div>
  );
}
