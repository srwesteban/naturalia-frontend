const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener todas las categorías
export const getCategories = async () => {
  const resp = await fetch(`${API_URL}/categories`);
  if (!resp.ok) throw new Error('No se pudieron cargar las categorías');
  return await resp.json();
};

// Asignar categoría a un alojamiento
export const assignCategory = async (stayId, categoryId) => {
  const resp = await fetch(`${API_URL}/stays/${stayId}/category`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ categoryId }),
  });

  if (!resp.ok) throw new Error('Error asignando categoría');
  return await resp.json();
};

// Crear nueva categoría
export const createCategory = async (categoryData) => {
  const resp = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  if (!resp.ok) throw new Error('Error creando la categoría');
  return await resp.json();
};

// Eliminar una categoría
export const deleteCategory = async (categoryId) => {
  const resp = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    const errorData = await resp.json();
    throw new Error(errorData.message || 'Error eliminando la categoría');
  }
};
