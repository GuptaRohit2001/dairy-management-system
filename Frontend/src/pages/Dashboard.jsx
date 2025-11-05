import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function Dashboard() {
  const [dailyMilk, setDailyMilk] = useState(null);
  const [dailySales, setDailySales] = useState(null);
  const todayISO = new Date().toISOString().slice(0, 10);

  async function load() {
    try {
      const milk = await api.getMilkSummaryDaily(todayISO);
      const sales = await api.getSalesSummaryDaily(todayISO);
      setDailyMilk(milk);
      setDailySales(sales);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-wide">
        Dairy Management Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3 flex items-center gap-2">
            🥛 Today's Milk Summary
          </h3>
          <div className="text-gray-700 space-y-2">
            <p className="text-lg">
              Total Quantity: <strong className="text-indigo-800">{dailyMilk ? dailyMilk.totalQuantity : '—'}</strong> liters
            </p>
            <p className="text-lg">
              Average Fat: <strong className="text-indigo-800">{dailyMilk && dailyMilk.avgFat ? dailyMilk.avgFat.toFixed(2) : '—'}</strong>%
            </p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3 flex items-center gap-2">
            💰 Today's Sales Summary
          </h3>
          <div className="text-gray-700 space-y-2">
            <p className="text-lg">
              Total Sold: <strong className="text-indigo-800">{dailySales ? dailySales.totalSold : 0}</strong> liters
            </p>
            <p className="text-lg">
              Total Amount: <strong className="text-indigo-800">₹{dailySales ? dailySales.totalAmount : 0}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
