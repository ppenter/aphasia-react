import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { MainLayout } from './layouts/main-layout';
import { SelectLanguage } from './pages/Languages';
import { MainPage } from './pages/Main';
import { SettingPage } from './pages/settings';
import { ListPage } from './pages/lists';
import {
  RecoilRoot,
} from 'recoil';

import { TypeTextPage } from './pages/type-text';
import { FavoritesPage } from './pages/favorites';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/settings", element: <SettingPage /> },
      { path: "/tts", element: <TypeTextPage />},
      { path: "/favorites", element: <FavoritesPage />},
      { path: "/:item", element: <ListPage />},
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
    <RouterProvider router={router} />
    <ToastContainer autoClose={1000} />
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
