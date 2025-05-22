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
