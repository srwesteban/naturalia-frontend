const API_BASE_URL = 'http://localhost:8080';

const getAuthToken = () => localStorage.getItem('token');

const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(text || `Error ${response.status}`);
  }
  return response;
};

export const getAllStays = async () => {
  const response = await authFetch(`${API_BASE_URL}/stays`, { method: 'GET' });
  return response.json();
};

export const createStay = async (stayData) => {
  const response = await authFetch(`${API_BASE_URL}/stays`, {
    method: 'POST',
    body: JSON.stringify(stayData),
  });
  return response.json();
};

export const getStayById = async (id) => {
  const response = await authFetch(`${API_BASE_URL}/stays/${id}`, { method: 'GET' });
  return response.json();
};

export const getStaySummaries = async () => {
  const response = await authFetch(`${API_BASE_URL}/stays/summary`, { method: 'GET' });
  return response.json();
};

export const updateStay = async (id, stayData) => {
  const response = await authFetch(`${API_BASE_URL}/stays/${id}`, {
    method: 'PUT',
    body: JSON.stringify(stayData),
  });
  return response.json();
};

export const deleteStayById = async (id) => {
  await authFetch(`${API_BASE_URL}/stays/${id}`, { method: 'DELETE' });
};
