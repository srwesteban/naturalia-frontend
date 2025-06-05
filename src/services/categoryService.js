const API_URL = 'http://localhost:8080';

export const getCategories = async () => {
  const resp = await fetch(`${API_URL}/categories`);
  if (!resp.ok) throw new Error('No se pudieron cargar las categorías');
  return resp.json();
};

export const assignCategory = async (stayId, categoryId) => {
  const resp = await fetch(
    `${API_URL}/stays/${stayId}/category`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoryId }),
    }
  );
  if (!resp.ok) throw new Error('Error asignando categoría');
  return resp.json();
};

export const createCategory = async (categoryData) => {
  const resp = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });
  if (!resp.ok) throw new Error('Error creando la categoría');
  return resp.json();
};

export const deleteCategory = async (categoryId) => {
  const resp = await fetch(`${API_URL}/categories/${categoryId}`, {
    method: 'DELETE',
  });

  if (!resp.ok) {
    const errorData = await resp.json(); // ✅ Lee JSON, no texto plano
    throw new Error(errorData.message || 'Error eliminando la categoría');
  }
};
