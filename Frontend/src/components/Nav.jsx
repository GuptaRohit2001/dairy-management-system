import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('dairy_user') || 'null');

  const logout = () => {
    localStorage.removeItem('dairy_token');
    localStorage.removeItem('dairy_user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow p-4 mb-6">
      <div className="container flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">Dairy Management</Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="mr-2">Hi, {user.name}</span>
              <Link to="/farmers" className="px-3 py-1 rounded bg-gray-100">Farmers</Link>
              <Link to="/milk" className="px-3 py-1 rounded bg-gray-100">Milk</Link>
              <Link to="/sales" className="px-3 py-1 rounded bg-gray-100">Sales</Link>
              <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded bg-blue-500 text-white">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded bg-gray-100">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
