const API_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener políticas
export const getPolicies = async () => {
  const resp = await fetch(`${API_URL}/policies`);
  if (!resp.ok) throw new Error('Error al cargar las políticas');
  return await resp.json();
};
