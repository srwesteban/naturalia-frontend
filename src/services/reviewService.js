const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener token y headers de autorización
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

// Obtener reseñas por alojamiento
export const getReviewsByStayId = async (stayId) => {
  const response = await fetch(`${API_URL}/reviews/stay/${stayId}`, {
    method: "GET",
    headers: getAuthHeaders(), // opcional si es público
  });
  if (!response.ok) throw new Error("No se pudieron cargar las reseñas");
  return await response.json();
};

// Obtener calificación promedio de un alojamiento
export const getAverageRating = async (stayId) => {
  const response = await fetch(`${API_URL}/reviews/stay/${stayId}/average`, {
    method: "GET",
    headers: getAuthHeaders(), // opcional si es público
  });
  if (!response.ok) throw new Error("No se pudo cargar el promedio");
  return await response.json();
};

// Enviar reseña (requiere autenticación)
export const postReview = async ({ stayId, rating, comment }) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ stayId, rating, comment }),
  });

  if (!response.ok) throw new Error("No se pudo enviar la reseña");
  return await response.text();
};
