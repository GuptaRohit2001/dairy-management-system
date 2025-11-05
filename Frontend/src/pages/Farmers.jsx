import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const [form, setForm] = useState({ farmerId:'', name:'', phone:'', address:''});
  const [query, setQuery] = useState('');
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');

  const load = async () => {
    try {
      const data = await api.getFarmers(query);
      setFarmers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.updateFarmer(editId, form);
        setMsg('✅ Farmer updated successfully!');
      } else {
        await api.createFarmer(form);
        setMsg('✅ Farmer added successfully!');
      }
      setForm({ farmerId:'', name:'', phone:'', address:''});
      setEditId(null);
      await load();
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  };

  const onEdit = (f) => {
    setEditId(f._id);
    setForm({ farmerId: f.farmerId, name: f.name, phone: f.phone || '', address: f.address || ''});
  };

  const onDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this farmer?')) return;
    try {
      await api.deleteFarmer(id);
      await load();
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  };

  const onSearch = async () => {
    try {
      const data = await api.getFarmers(query);
      setFarmers(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">🌾 Farmer Management</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-3 justify-center">
        <input 
          value={query} 
          onChange={e=>setQuery(e.target.value)} 
          placeholder="🔍 Search by ID or name"
          className="p-3 border-2 border-green-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 flex-1 md:max-w-sm"
        />
        <button 
          onClick={onSearch} 
          className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition-all duration-200"
        >
          Search
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            {editId ? '✏️ Edit Farmer' : '➕ Add Farmer'}
          </h3>
          {msg && <div className="mb-3 text-sm text-green-700 font-medium">{msg}</div>}

          <form onSubmit={submit} className="space-y-3">
            <input required value={form.farmerId} onChange={e=>setForm({...form, farmerId:e.target.value})}
              placeholder="Farmer ID" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400"/>
            <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
              placeholder="Full Name" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400"/>
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
              placeholder="Phone Number" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400"/>
            <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})}
              placeholder="Address" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-green-400"/>

            <div className="flex gap-3 pt-2">
              <button className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 shadow">
                {editId ? 'Update' : 'Add'}
              </button>
              {editId && (
                <button 
                  type="button" 
                  onClick={()=>{ setEditId(null); setForm({farmerId:'',name:'',phone:'',address:''}); }}
                  className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Farmers List Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-green-700 mb-3">👩‍🌾 All Farmers</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="bg-green-50 text-green-700 border-b border-green-100">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map(f => (
                  <tr key={f._id} className="border-b hover:bg-green-50 transition-colors duration-150">
                    <td className="p-3 font-medium text-gray-800">{f.farmerId}</td>
                    <td className="p-3">{f.name}</td>
                    <td className="p-3">{f.phone}</td>
                    <td className="p-3 flex gap-2">
                      <button onClick={()=>onEdit(f)} className="text-blue-600 hover:text-blue-800 font-medium">Edit</button>
                      <button onClick={()=>onDelete(f._id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                    </td>
                  </tr>
                ))}
                {farmers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-3 text-center text-gray-500 italic">No farmers found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
