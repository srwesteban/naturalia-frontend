const API_URL = 'http://localhost:8080';

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

export const getReservationsByStay = async (stayId) => {
  const response = await fetch(`${API_URL}/reservations/stay/${stayId}`);
  if (!response.ok) throw new Error("No se pudieron cargar las reservas");
  return response.json();
};
