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

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

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
        customerName: '',
        pricePerLitre: ''
      });
      await load();
    } catch (err) {
      setMsg(err.message);
    }
  };

  // ✅ Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sales.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(sales.length / recordsPerPage);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🧾 Sales / Distribution
      </h2>

      {/* ✅ Independent boxes using flex */}
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        
        {/* Left Form Box */}
        <div className="md:w-1/2 self-start bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100">
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition cursor-pointer"
            />
            <input
              required
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              placeholder="Quantity (liters)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="Buyer Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              required
              value={form.pricePerLitre}
              onChange={(e) => setForm({ ...form, pricePerLitre: e.target.value })}
              placeholder="Price per liter"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-transform transform hover:scale-[1.02] shadow-md cursor-pointer">
              Save Record
            </button>
          </form>
        </div>

        {/* Right Table Box (Fixed height for 5 records) */}
        <div className="md:w-1/2 self-start bg-white/90 p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">Sales Records</h3>

          {/* ✅ Fixed height scrollable area */}
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg h-[275px]">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50 text-blue-700 font-semibold sticky top-0">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">Buyer</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((s) => (
                  <tr key={s._id} className="border-t hover:bg-blue-50 transition">
                    <td className="p-3">{new Date(s.date).toLocaleDateString()}</td>
                    <td className="p-3">{s.quantity}</td>
                    <td className="p-3">{s.customerName || '-'}</td>
                    <td className="p-3">{s.pricePerLitre}</td>
                    <td className="p-3">{s.totalAmount}</td>
                  </tr>
                ))}

                {/* ✅ Keep fixed height look with empty rows */}
                {currentRecords.length < 5 &&
                  Array.from({ length: 5 - currentRecords.length }).map((_, i) => (
                    <tr key={`empty-${i}`} className="border-t">
                      <td colSpan={5} className="p-3 text-transparent">-</td>
                    </tr>
                  ))
                }

                {sales.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500 italic">
                      No sales recorded yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-blue-300 rounded-md text-blue-600 hover:bg-blue-100 disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>

              <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-blue-300 rounded-md text-blue-600 hover:bg-blue-100 disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
