import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const data = await api.login(form);
      localStorage.setItem('dairy_token', data.token);
      localStorage.setItem('dairy_user', JSON.stringify(data.user));
      navigate('/');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-blue-100">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome Back</h2>
        {err && (
          <div className="bg-red-100 text-red-800 border border-red-300 rounded p-2 mb-4 text-sm text-center">
            {err}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <input
              required
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
