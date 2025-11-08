import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const data = await api.register(form);
      localStorage.setItem('dairy_token', data.token);
      localStorage.setItem('dairy_user', JSON.stringify(data.user));
      navigate('/');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Create Account</h2>
        {err && (
          <div className="bg-red-100 text-red-800 p-3 mb-3 rounded border border-red-300 text-center text-sm">
            {err}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <input
            required
            value={form.password}
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
          />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-transform transform hover:scale-[1.02] shadow-md cursor-pointer">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
