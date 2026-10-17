import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppShell from './layouts/AppShell.jsx';
import ProtectedRoute from './layouts/ProtectedRoute.jsx';
import Login from './pages/Login.jsx';
import Todos from './pages/Todos.jsx';

export default createBrowserRouter([
  { path: 'login', element: <Login /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          { index: true, element: <Todos /> },
          { path: '*', element: <Navigate to="/" replace /> },
        ],
      },
    ],
  },
]);