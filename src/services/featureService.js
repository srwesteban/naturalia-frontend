const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthToken = () => localStorage.getItem('token');

// Fetch con token de autenticación incluido si existe
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

// Obtener todas las características
export const getFeatures = async () => {
  const response = await authFetch(`${API_BASE_URL}/features`, { method: 'GET' });
  return await response.json();
};

// Crear nueva característica
export const createFeature = async (featureData) => {
  const response = await authFetch(`${API_BASE_URL}/features`, {
    method: 'POST',
    body: JSON.stringify(featureData),
  });
  return await response.json();
};

// Actualizar una característica existente
export const updateFeature = async (id, featureData) => {
  const response = await authFetch(`${API_BASE_URL}/features/${id}`, {
    method: 'PUT',
    body: JSON.stringify(featureData),
  });
  return await response.json();
};

// Eliminar una característica
export const deleteFeature = async (id) => {
  await authFetch(`${API_BASE_URL}/features/${id}`, { method: 'DELETE' });
};
