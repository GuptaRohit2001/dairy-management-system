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
        setMsg('Updated');
      } else {
        await api.createFarmer(form);
        setMsg('Created');
      }
      setForm({ farmerId:'', name:'', phone:'', address:''});
      setEditId(null);
      await load();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const onEdit = (f) => {
    setEditId(f._id);
    setForm({ farmerId: f.farmerId, name: f.name, phone: f.phone || '', address: f.address || ''});
  };

  const onDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await api.deleteFarmer(id);
      await load();
    } catch (err) {
      setMsg(err.message);
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
    <div>
      <h2 className="text-xl mb-4">Farmers</h2>
      <div className="mb-4 flex gap-2">
        <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by ID or name"
          className="p-2 border rounded flex-1"/>
        <button onClick={onSearch} className="px-4 bg-blue-500 text-white rounded">Search</button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">{editId ? 'Edit Farmer' : 'Add Farmer'}</h3>
          {msg && <div className="mb-2 text-green-700">{msg}</div>}
          <form onSubmit={submit} className="space-y-2">
            <input required value={form.farmerId} onChange={e=>setForm({...form, farmerId:e.target.value})}
              placeholder="Farmer ID" className="w-full p-2 border rounded"/>
            <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})}
              placeholder="Name" className="w-full p-2 border rounded"/>
            <input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}
              placeholder="Phone" className="w-full p-2 border rounded"/>
            <input value={form.address} onChange={e=>setForm({...form, address:e.target.value})}
              placeholder="Address" className="w-full p-2 border rounded"/>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-500 text-white rounded">{editId ? 'Update' : 'Add'}</button>
              {editId && <button type="button" onClick={()=>{ setEditId(null); setForm({farmerId:'',name:'',phone:'',address:''}); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">All Farmers</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="p-2">ID</th><th>Name</th><th>Phone</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map(f => (
                  <tr key={f._id} className="border-t">
                    <td className="p-2">{f.farmerId}</td>
                    <td>{f.name}</td>
                    <td>{f.phone}</td>
                    <td>
                      <button onClick={()=>onEdit(f)} className="mr-2 text-blue-600">Edit</button>
                      <button onClick={()=>onDelete(f._id)} className="text-red-600">Delete</button>
                    </td>
                  </tr>
                ))}
                {farmers.length===0 && <tr><td colSpan={4} className="p-2 text-gray-500">No farmers found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
