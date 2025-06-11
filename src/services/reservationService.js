const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener token y headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Crear una nueva reserva
export const createReservation = async (data) => {
  const response = await fetch(`${API_URL}/reservations`, {
    method: "POST",
    headers: getAuthHeaders(),
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

// Obtener reservas de un alojamiento (puede estar público o protegido)
export const getReservationsByStay = async (stayId) => {
  const response = await fetch(`${API_URL}/reservations/stay/${stayId}`, {
    method: "GET",
    headers: getAuthHeaders(), // opcional si el endpoint es público
  });

  if (!response.ok) throw new Error("No se pudieron cargar las reservas");
  return await response.json();
};

// Obtener reservas del usuario autenticado
export const getMyReservations = async () => {
  const response = await fetch(`${API_URL}/reservations/mine`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("No se pudieron cargar tus reservas");
  return await response.json();
};

// Eliminar una reserva
export const deleteReservation = async (id) => {
  const response = await fetch(`${API_URL}/reservations/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Error al eliminar la reserva");
  return await response.text();
};
