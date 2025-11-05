import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const appName = import.meta.env.VITE_APP_NAME;

export default function Nav() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('dairy_user') || 'null');

  const logout = () => {
    localStorage.removeItem('dairy_token');
    localStorage.removeItem('dairy_user');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg mb-6">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Link
          to="/"
          className="font-extrabold text-2xl tracking-wide hover:opacity-90 transition"
        >
          {appName}
        </Link>

        <div className="space-x-3 flex items-center">
          {user ? (
            <>
              <span className="mr-3 text-sm bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                👋 Hi, <span className="font-semibold">{user.name}</span>
              </span>
              <Link
                to="/farmers"
                className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-100 font-medium transition"
              >
                Farmers
              </Link>
              <Link
                to="/milk"
                className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-100 font-medium transition"
              >
                Milk
              </Link>
              <Link
                to="/sales"
                className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-100 font-medium transition"
              >
                Sales
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-white text-blue-600 hover:bg-blue-100 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg bg-white/20 border border-white/30 hover:bg-white/30 backdrop-blur-sm text-white font-medium transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
