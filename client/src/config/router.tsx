import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Index from '../pages/Index';
import Login from '../pages/Login';
import Analyze from '../pages/Analyze';
import Report from '../pages/Report';
import Plan from '../pages/Plan';
import Profile from '../pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/analyze',
        element: <Analyze />,
      },
      {
        path: '/report/:id',
        element: <Report />,
      },
      {
        path: '/plan',
        element: <Plan />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

export default router;