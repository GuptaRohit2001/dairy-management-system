import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function Sales() {
  const [form, setForm] = useState({ date:new Date().toISOString().slice(0,10), quantity:'', buyer:'', pricePerLiter:''});
  const [sales, setSales] = useState([]);
  const [msg, setMsg] = useState('');

  async function load(){
    try {
      const data = await api.getSales();
      setSales(data);
    } catch (err) { console.error(err); }
  }

  useEffect(()=>{ load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.addSale(form);
      setMsg('Sale recorded');
      setForm({ date:new Date().toISOString().slice(0,10), quantity:'', buyer:'', pricePerLiter:''});
      await load();
    } catch (err) { setMsg(err.message); }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Sales / Distribution</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Record Sale</h3>
          {msg && <div className="mb-2 text-green-700">{msg}</div>}
          <form onSubmit={submit} className="space-y-2">
            <input required type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full p-2 border rounded"/>
            <input required value={form.quantity} onChange={e=>setForm({...form, quantity:e.target.value})} placeholder="Quantity (liters)" className="w-full p-2 border rounded"/>
            <input value={form.buyer} onChange={e=>setForm({...form, buyer:e.target.value})} placeholder="Buyer" className="w-full p-2 border rounded"/>
            <input required value={form.pricePerLiter} onChange={e=>setForm({...form, pricePerLiter:e.target.value})} placeholder="Price per liter" className="w-full p-2 border rounded"/>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow overflow-x-auto">
          <h3 className="font-bold mb-2">Sales List</h3>
          <table className="min-w-full text-sm">
            <thead><tr><th className="p-2">Date</th><th>Qty</th><th>Buyer</th><th>Price</th><th>Total</th></tr></thead>
            <tbody>
              {sales.map(s => (
                <tr key={s._id} className="border-t">
                  <td className="p-2">{new Date(s.date).toLocaleDateString()}</td>
                  <td>{s.quantity}</td>
                  <td>{s.buyer}</td>
                  <td>{s.pricePerLiter}</td>
                  <td>{s.totalAmount}</td>
                </tr>
              ))}
              {sales.length===0 && <tr><td className="p-2" colSpan={5}>No sales yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
