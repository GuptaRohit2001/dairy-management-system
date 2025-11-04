import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function Dashboard(){
  const [dailyMilk, setDailyMilk] = useState(null);
  const [dailySales, setDailySales] = useState(null);
  const todayISO = new Date().toISOString().slice(0,10);

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

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-bold">Today's Milk</h3>
          <p>Total: <strong>{dailyMilk ? dailyMilk.totalQuantity : '—'}</strong> liters</p>
          <p>Avg Fat: <strong>{dailyMilk && dailyMilk.avgFat ? dailyMilk.avgFat.toFixed(2) : '—'}</strong></p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-bold">Today's Sales</h3>
          <p>Total Sold: <strong>{dailySales ? dailySales.totalSold : 0}</strong> liters</p>
          <p>Total Amount: <strong>{dailySales ? dailySales.totalAmount : 0}</strong></p>
        </div>
      </div>
    </div>
  );
}
