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
