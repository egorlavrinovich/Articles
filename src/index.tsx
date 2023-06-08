import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import ArticleDetailPage from './pages/ArticleDetailPage/ArticleDetailPage';
import MainPage from './pages/Main/MainPage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config/fireBaseConfig';

initializeApp(firebaseConfig); // иницилизация fireBase


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: "article/:articleId",
    element: <ArticleDetailPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

