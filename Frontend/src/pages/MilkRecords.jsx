import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function MilkRecords() {
  const [farmers, setFarmers] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({ farmerId:'', date: new Date().toISOString().slice(0,10), quantity:'', fat:'', ratePerLiter:'' });
  const [msg, setMsg] = useState('');

  async function loadFarmers() {
    try {
      const data = await api.getFarmers();
      setFarmers(data);
    } catch (err) { console.error(err); }
  }
  async function loadRecords() {
    try {
      const data = await api.getMilk();
      setRecords(data);
    } catch (err) { console.error(err); }
  }

  useEffect(()=>{ loadFarmers(); loadRecords(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.addMilk(form);
      setMsg('Saved');
      setForm({ farmerId:'', date: new Date().toISOString().slice(0,10), quantity:'', fat:'', ratePerLiter:'' });
      await loadRecords();
    } catch (err) { setMsg(err.message); }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this record?')) return;
    try {
      await api.deleteMilk(id);
      await loadRecords();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Milk Records</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Add Milk Entry</h3>
          {msg && <div className="mb-2 text-green-700">{msg}</div>}
          <form onSubmit={submit} className="space-y-2">
            <select required value={form.farmerId} onChange={e=>setForm({...form, farmerId:e.target.value})} className="w-full p-2 border rounded">
              <option value="">Select Farmer (by ID)</option>
              {farmers.map(f => <option key={f._id} value={f.farmerId}>{f.farmerId} — {f.name}</option>)}
            </select>
            <input required type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 border rounded"/>
            <input required value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} placeholder="Quantity (liters)" className="w-full p-2 border rounded"/>
            <input value={form.fat} onChange={e=>setForm({...form, fat:e.target.value})} placeholder="Fat (%)" className="w-full p-2 border rounded"/>
            <input value={form.ratePerLiter} onChange={e=>setForm({...form, ratePerLiter:e.target.value})} placeholder="Rate per liter (optional)" className="w-full p-2 border rounded"/>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <h3 className="font-bold mb-2">Records</h3>
          <table className="min-w-full text-sm">
            <thead><tr><th className="p-2">Date</th><th>Farmer</th><th>Qty</th><th>Fat</th><th>Rate</th><th>Action</th></tr></thead>
            <tbody>
              {records.map(r => (
                <tr key={r._id} className="border-t">
                  <td className="p-2">{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.farmer?.farmerId} — {r.farmer?.name}</td>
                  <td>{r.quantity}</td>
                  <td>{r.fat || '-'}</td>
                  <td>{r.ratePerLiter}</td>
                  <td><button onClick={()=>onDelete(r._id)} className="text-red-600">Delete</button></td>
                </tr>
              ))}
              {records.length===0 && <tr><td className="p-2" colSpan={6}>No records yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
