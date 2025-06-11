const API_URL = import.meta.env.VITE_API_BASE_URL;

// Crear una nueva reserva
export const createReservation = async (data) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg = "Error al crear la reserva.";
    try {
      const errorBody = await response.json();
      if (errorBody.message) errorMsg = errorBody.message;
    } catch (e) {
      const fallback = await response.text();
      if (fallback) errorMsg = fallback;
    }
    throw new Error(errorMsg);
  }

  return await response.json();
};

// Obtener reservas de un alojamiento
export const getReservationsByStay = async (stayId) => {
  const response = await fetch(`${API_URL}/reservations/stay/${stayId}`);
  if (!response.ok) throw new Error("No se pudieron cargar las reservas");
  return await response.json();
};

// Obtener reservas del usuario autenticado
export const getMyReservations = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reservations/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('No se pudieron cargar tus reservas');
  return await response.json();
};


// Eliminar una reserva (hard)
export const deleteReservation = async (id) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Error al eliminar la reserva');
  return await response.text();
};
