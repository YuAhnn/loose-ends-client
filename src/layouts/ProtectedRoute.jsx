import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth';

export default function ProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  const loadMe = useAuthStore((s) => s.loadMe);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
}