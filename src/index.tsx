import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import * as serviceWorker from 'serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {AppNavigation} from "navigation/AppNavigation";
const root = createRoot(
  document.getElementById('root') as HTMLDivElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        {/* header */}
        <AppNavigation />
        {/* footer */}
      </BrowserRouter>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
