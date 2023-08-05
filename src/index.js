import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store'
import AlbumList from './albumList/AlbumList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/albumList",
    element: <AlbumList/>
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

