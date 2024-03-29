import React from 'react';
// @ts-ignore
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppNavigation } from 'src/navigation/AppNavigation';
import { CssBaseline } from '@mui/material';
import { unstable_ClassNameGenerator as ClassNameGenerator } from '@mui/material/className';
// import * as serviceWorker from 'serviceWorker';
import { Provider } from 'react-redux'
import { store } from 'src/store';
import { Header } from 'src/components/header/Header';
import Footer from './components/footer/Footer';

ClassNameGenerator.configure((componentName) =>
  componentName.replace('Mui', ''),
);

const loader = document.querySelector('.loader')

const showLoader = () => loader?.classList.remove('loader--hide');
const hideLoader = () => loader?.classList.add('loader--hide');

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
        <CssBaseline />
        <Header />
        <AppNavigation
          hideLoader={hideLoader}
          showLoader={showLoader}
        />
        <Footer />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister()
