const API_BASE_URL = 'http://localhost:8080/stays'; // o tu URL deploy

export const getAllStays = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Error al cargar stays');
  return response.json();
};

export const createStay = async (stayData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stayData),
  });
  if (!response.ok) throw new Error('Error al crear stay');
  return response.json();
};

export const getStayById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error('Stay no encontrado');
  return response.json();
};

export const getStaySummaries = async () => {
  const response = await fetch(`${API_BASE_URL}/summary`);
  if (!response.ok) throw new Error('Error al obtener los stays');
  return response.json(); // [{id, name}]
};

export const deleteStayById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar stay');
};
