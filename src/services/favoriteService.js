const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener token desde localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

// Obtener favoritos por usuario
export const getFavoritesByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/user/${userId}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || 'No se pudieron obtener los favoritos');
    }

    return await response.json();
  } catch (error) {
    console.error('❌ Error al obtener favoritos:', error.message);
    throw error;
  }
};

// Agregar alojamiento a favoritos
export const addFavorite = async (userId, stayId) => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ userId, stayId }),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "No se pudo agregar a favoritos");
  }

  return await response.json();
};

// Eliminar favorito por usuario y alojamiento
export const removeFavorite = async (userId, stayId) => {
  try {
    const response = await fetch(`${API_URL}/favorites?userId=${userId}&stayId=${stayId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const msg = await response.text();
      throw new Error(msg || 'No se pudo eliminar de favoritos');
    }

    return true;
  } catch (error) {
    console.error('❌ Error al eliminar favorito:', error.message);
    throw error;
  }
};
