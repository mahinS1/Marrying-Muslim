import React from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? <Outlet /> : <Navigate to="/" replace />;
};
