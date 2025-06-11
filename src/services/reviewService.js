const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener reseñas por alojamiento
export const getReviewsByStayId = async (stayId) => {
  const response = await fetch(`${API_URL}/reviews/stay/${stayId}`);
  if (!response.ok) throw new Error('No se pudieron cargar las reseñas');
  return await response.json();
};

// Obtener calificación promedio de un alojamiento
export const getAverageRating = async (stayId) => {
  const response = await fetch(`${API_URL}/reviews/stay/${stayId}/average`);
  if (!response.ok) throw new Error('No se pudo cargar el promedio');
  return await response.json();
};

// Enviar reseña
export const postReview = async ({ stayId, rating, comment }) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ stayId, rating, comment }),
  });

  if (!response.ok) throw new Error('No se pudo enviar la reseña');
  return await response.text();
};
