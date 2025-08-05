import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading spinner or skeleton
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a'
      }}>
        <div style={{
          color: '#fff',
          fontSize: '18px'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to signin but save the attempted location
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};