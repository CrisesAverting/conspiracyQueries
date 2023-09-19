import React from 'react';
import ReactDOM from 'react-dom/client';
// Bringing in the required imports from 'react-router-dom' to set up application routing behavior
import { createHashRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import './styles.css';

// Bringing in the pages the router will use to conditionally show the appropriate views
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/signup';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/shop';
const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      }, 
      {
        path: '/login',
        element: <Login />
      },
       {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/Dashboard',
        element: <Dashboard />
      },
      {
        path: '/shop',
        element: <ProductList />
      }
    ],
  },
]);

// Render the RouterProvider component
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);