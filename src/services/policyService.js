const API_URL = 'http://localhost:8080';

export const getPolicies = async () => {
  const resp = await fetch(`${API_URL}/policies`);
  if (!resp.ok) throw new Error('Error al cargar las políticas');
  return resp.json();
};
