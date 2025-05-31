
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

export const getFeatures = async () => {
  const response = await authFetch(`${API_BASE_URL}/features`, { method: 'GET' });
  return response.json();
};

export const createFeature = async (featureData) => {
  const response = await authFetch(`${API_BASE_URL}/features`, {
    method: 'POST',
    body: JSON.stringify(featureData),
  });
  return response.json();
};

export const updateFeature = async (id, featureData) => {
  const response = await authFetch(`${API_BASE_URL}/features/${id}`, {
    method: 'PUT',
    body: JSON.stringify(featureData),
  });
  return response.json();
};

export const deleteFeature = async (id) => {
  await authFetch(`${API_BASE_URL}/features/${id}`, { method: 'DELETE' });
};
