const API_URL = 'http://localhost:8080';

export const getFavoritesByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/favorites/user/${userId}`);
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

export const addFavorite = async (userId, stayId) => {
  const response = await fetch("http://localhost:8080/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, stayId }),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || "No se pudo agregar a favoritos");
  }

  return await response.json(); // ✅ seguro porque ahora el backend sí responde con JSON
};


export const removeFavorite = async (userId, stayId) => {
  try {
    const response = await fetch(`${API_URL}/favorites?userId=${userId}&stayId=${stayId}`, {
      method: 'DELETE',
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
