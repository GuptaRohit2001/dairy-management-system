import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('dairy_token');
  if (!token)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium text-lg">
            Redirecting to login...
          </p>
        </div>
        <Navigate to="/login" replace />
      </div>
    );

  return children;
}
