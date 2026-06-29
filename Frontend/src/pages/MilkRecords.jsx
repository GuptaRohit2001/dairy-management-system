import React, { useState, useEffect } from 'react';
import api from '../api/api';

export default function MilkRecords() {
  const [farmers, setFarmers] = useState([]);
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    farmer: '',
    date: new Date().toISOString().slice(0, 10),
    quantity: '',
    fatContent: '',
    ratePerLiter: '',
  });
  const [msg, setMsg] = useState('');

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // 👈 Show 5 records per page by default

  async function loadFarmers() {
    try {
      const data = await api.getFarmers();
      setFarmers(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadRecords() {
    try {
      const data = await api.getMilk();
      setRecords(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadFarmers();
    loadRecords();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.addMilk({
        farmer: form.farmer,
        date: form.date,
        quantity: form.quantity,
        fatContent: form.fatContent,
        ratePerLiter: form.ratePerLiter,
      });
      setMsg('Saved successfully!');
      setForm({
        farmer: '',
        date: new Date().toISOString().slice(0, 10),
        quantity: '',
        fatContent: '',
        ratePerLiter: '',
      });
      await loadRecords();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error saving record');
    }
  };

  const onDelete = async (id) => {
    if (!confirm('Delete this record?')) return;
    try {
      await api.deleteMilk(id);
      await loadRecords();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">Milk Records</h2>

      {/* ✅ Use flex to keep boxes side-by-side but independent */}
      <div className="flex flex-col md:flex-row items-start gap-6">
        
        {/* Left Form */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 w-full md:w-1/2 min-h-[450px]">
          <h3 className="font-semibold text-lg text-blue-600 mb-4">Add Milk Entry</h3>
          {msg && (
            <div className="mb-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded p-2 text-center">
              {msg}
            </div>
          )}
          <form onSubmit={submit} className="space-y-3">
            <select
              required
              value={form.farmer}
              onChange={(e) => setForm({ ...form, farmer: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition cursor-pointer"
            >
              <option value="">Select Farmer (by ID)</option>
              {farmers.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.farmerId} — {f.name}
                </option>
              ))}
            </select>
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
              value={form.fatContent}
              onChange={(e) => setForm({ ...form, fatContent: e.target.value })}
              placeholder="Fat (%)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <input
              value={form.ratePerLiter}
              onChange={(e) => setForm({ ...form, ratePerLiter: e.target.value })}
              placeholder="Rate per liter (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-transform transform hover:scale-[1.02] cursor-pointer">
              Save
            </button>
          </form>
        </div>

        {/* Right Table */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-100 overflow-hidden w-full md:w-1/2 min-h-[450px] flex flex-col">
          <h3 className="font-semibold text-lg text-blue-600 mb-4">Records</h3>

          {/* Table container with fixed scrollable area */}
          <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-50 text-gray-700 sticky top-0">
                <tr>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Farmer</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Fat</th>
                  <th className="p-3 text-left">Rate</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((r) => (
                  <tr key={r._id} className="border-t hover:bg-blue-50 transition">
                    <td className="p-3">{new Date(r.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      {r.farmer?.farmerId} — {r.farmer?.name}
                    </td>
                    <td className="p-3">{r.quantity}</td>
                    <td className="p-3">{r.fatContent || '-'}</td>
                    <td className="p-3">{r.ratePerLiter || '-'}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => onDelete(r._id)}
                        className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {records.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      No records yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination Controls */}
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

