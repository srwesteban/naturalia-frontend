const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener token desde localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

// Obtener todas las categorías (puede ser público, pero si quieres seguridad extra, usa token)
export const getCategories = async () => {
  const resp = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!resp.ok) throw new Error("No se pudieron cargar las categorías");
  return await resp.json();
};

// Asignar categoría a un alojamiento (ADMIN)
export const assignCategory = async (stayId, categoryId) => {
  const resp = await fetch(`${API_URL}/stays/${stayId}/category`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({ categoryId }),
  });

  if (!resp.ok) throw new Error("Error asignando categoría");
  return await resp.json();
};

// Crear nueva categoría (ADMIN)
export const createCategory = async (categoryData) => {
  const resp = await fetch(`${API_URL}/categories`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(categoryData),
  });

  if (!resp.ok) throw new Error("Error creando la categoría");
  return await resp.json();
};

// Eliminar una categoría (ADMIN)
export const deleteCategory = async (categoryId) => {
  const resp = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.message || "Error eliminando la categoría");
  }
};
