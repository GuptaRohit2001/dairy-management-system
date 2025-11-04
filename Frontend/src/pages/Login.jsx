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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="bg-red-100 text-red-800 p-2 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input required value={form.email} onChange={e=>setForm({...form, email: e.target.value})}
          placeholder="Email" className="w-full p-2 border rounded" />
        <input required value={form.password} type="password" onChange={e=>setForm({...form, password: e.target.value})}
          placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}
