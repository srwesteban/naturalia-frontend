// src/services/reviewService.js
const API_URL = 'http://localhost:8080';

export const getReviewsByStayId = async (stayId) => {
  const response = await fetch(`${API_URL}/reviews/stay/${stayId}`);
  if (!response.ok) throw new Error('No se pudieron cargar las reseñas');
  return response.json();
};

export const getAverageRating = async (stayId) => {
  const response = await fetch(`${API_URL}/reviews/stay/${stayId}/average`);
  if (!response.ok) throw new Error('No se pudo cargar el promedio');
  return response.json();
};

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
  return response.text();
};
