import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function Sales() {
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    quantity: '',
    customerName: '',  
    pricePerLitre: ''
  });
  const [sales, setSales] = useState([]);
  const [msg, setMsg] = useState('');

  async function load() {
    try {
      const data = await api.getSales();
      setSales(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.addSale(form);
      setMsg('✅ Sale recorded successfully!');
      setForm({
        date: new Date().toISOString().slice(0, 10),
        quantity: '',
        // buyer: '',
        // pricePerLiter: ''
        customerName: '',  
        pricePerLitre: ''
      });
      await load();
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🧾 Sales / Distribution
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">Record New Sale</h3>
          {msg && (
            <div className="mb-3 text-sm text-green-700 bg-green-50 border border-green-200 p-2 rounded">
              {msg}
            </div>
          )}
          <form onSubmit={submit} className="space-y-3">
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              required
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="Quantity (liters)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              value={form.buyer}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="Buyer Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              required
              value={form.pricePerLiter}
              onChange={(e) => setForm({ ...form, pricePerLitre: e.target.value })}
              placeholder="Price per liter"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-[1.02] shadow-md">
              Save Record
            </button>
          </form>
        </div>

        {/* Right Card */}
        <div className="bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100 overflow-x-auto">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">Sales Records</h3>
          <table className="min-w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-blue-50 text-blue-700 font-semibold">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Buyer</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr
                  key={s._id}
                  className="border-t hover:bg-blue-50 transition"
                >
                  <td className="p-3">{new Date(s.date).toLocaleDateString()}</td>
                  <td className="p-3">{s.quantity}</td>
                  <td className="p-3">{s.customerName || '-'}</td>
                  <td className="p-3">{s.pricePerLitre}</td>
                  <td className="p-3">{s.totalAmount}</td>
                </tr>
              ))}
              {sales.length === 0 && (
                <tr>
                  <td
                    className="p-3 text-center text-gray-500 italic"
                    colSpan={5}
                  >
                    No sales recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
