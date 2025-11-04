import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Farmers from './pages/Farmers';
import MilkRecords from './pages/MilkRecords';
import Sales from './pages/Sales';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Nav />
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/farmers" element={<ProtectedRoute><Farmers /></ProtectedRoute>} />
          <Route path="/milk" element={<ProtectedRoute><MilkRecords /></ProtectedRoute>} />
          <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}
