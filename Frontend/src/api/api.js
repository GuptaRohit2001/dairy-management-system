const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('dairy_token');
}

async function request(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, {...options, headers});
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || 'API error');
  return body;
}

export default {
  register: (data) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  getFarmers: (q) => request(`/farmers${q ? '?q='+encodeURIComponent(q):''}`),
  createFarmer: (data) => request('/farmers', { method: 'POST', body: JSON.stringify(data) }),
  updateFarmer: (id, data) => request(`/farmers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFarmer: (id) => request(`/farmers/${id}`, { method: 'DELETE' }),
  getMilk: (qs) => request(`/milk${qs||''}`),
  addMilk: (data) => request('/milk', { method: 'POST', body: JSON.stringify(data) }),
  updateMilk: (id, data) => request(`/milk/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMilk: (id) => request(`/milk/${id}`, { method: 'DELETE' }),
  getMilkSummaryDaily: (date) => request(`/milk/summary/daily${date ? '?date='+date:''}`),
  getMilkSummaryMonthly: (year, month) => request(`/milk/summary/monthly?year=${year}&month=${month}`),
  addSale: (data) => request('/sales', { method: 'POST', body: JSON.stringify(data) }),
  getSales: () => request('/sales'),
  getSalesSummaryDaily: (date) => request(`/sales/summary/daily${date ? '?date='+date:''}`)
};
