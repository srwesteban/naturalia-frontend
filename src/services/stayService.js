import { getUserId } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener token
const getAuthToken = () => localStorage.getItem("token");

// Fetch autenticado con token si existe
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
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

// 🏡 Obtener todos los alojamientos
export const getAllStays = async () => {
  const response = await authFetch(`${API_BASE_URL}/stays`, {
    method: "GET",
  });
  return await response.json();
};

// 🆕 Crear alojamiento
export const createStay = async (stayData) => {
  const response = await authFetch(`${API_BASE_URL}/stays`, {
    method: "POST",
    body: JSON.stringify(stayData),
  });
  return await response.json();
};

// 🔍 Obtener alojamiento por ID
export const getStayById = async (id) => {
  const response = await authFetch(`${API_BASE_URL}/stays/${id}`, {
    method: "GET",
  });
  return await response.json();
};

// 📋 Obtener resumen de alojamientos
export const getStaySummaries = async () => {
  const response = await authFetch(`${API_BASE_URL}/stays/summary`, {
    method: "GET",
  });
  return await response.json();
};

// ✏️ Actualizar alojamiento
export const updateStay = async (id, stayData) => {
  const response = await authFetch(`${API_BASE_URL}/stays/${id}`, {
    method: "PUT",
    body: JSON.stringify(stayData),
  });
  return await response.json();
};

// 🗑️ Eliminar alojamiento
export const deleteStayById = async (id) => {
  await authFetch(`${API_BASE_URL}/stays/${id}`, {
    method: "DELETE",
  });
};

// 📅 Buscar alojamientos por fechas (público)
export const searchStaysByDate = async (checkIn, checkOut) => {
  const response = await fetch(
    `${API_BASE_URL}/stays/search?checkIn=${checkIn}&checkOut=${checkOut}`
  );
  if (!response.ok) throw new Error("No se pudieron buscar los alojamientos");
  return await response.json();
};

// 📦 Buscar alojamientos con respuesta ligera (requiere auth)
export const searchStaysLight = async (checkIn, checkOut) => {
  const response = await authFetch(
    `${API_BASE_URL}/stays/search-light?checkIn=${checkIn}&checkOut=${checkOut}`
  );
  return await response.json();
};

// 🔍 Obtener sugerencias para búsqueda (público)
export const getSuggestions = async (query) => {
  const response = await fetch(
    `${API_BASE_URL}/stays/suggestions?query=${query}`
  );
  if (!response.ok) throw new Error("No se pudieron obtener sugerencias");
  return await response.json();
};

// 🌟 Alojamientos recomendados (público)
export const getRecommendedStays = async () => {
  const response = await fetch(`${API_BASE_URL}/stays/recommended`);
  if (!response.ok)
    throw new Error("Error al obtener alojamientos recomendados");
  return await response.json();
};

// 🪪 Obtener tarjetas resumidas para listado (requiere auth)
export const getStayListCards = async () => {
  const response = await authFetch(`${API_BASE_URL}/stays/list-cards`, {
    method: "GET",
  });
  return await response.json();
};

// 🔁 Actualización completa (por ID)
export const updateStayFull = async (id, data) => {
  const response = await authFetch(`${API_BASE_URL}/stays/${id}/full`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return true;
};

// 🧑‍💼 Obtener alojamientos del host autenticado
export const getMyStays = async () => {
  const userId = await getUserId();
  if (!userId) throw new Error("No se pudo obtener el ID del usuario");

  const response = await authFetch(`${API_BASE_URL}/stays/host/${userId}`, {
    method: "GET",
  });
  return await response.json();
};
