const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Obtener token del localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};

// ✅ Obtener todas las características (puede ser público)
export const getFeatures = async () => {
  const resp = await fetch(`${API_BASE_URL}/features`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!resp.ok) throw new Error("No se pudieron cargar las características");
  return await resp.json();
};

// ✅ Crear nueva característica (solo ADMIN)
export const createFeature = async (featureData) => {
  const resp = await fetch(`${API_BASE_URL}/features`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(featureData),
  });
  if (!resp.ok) throw new Error("Error creando la característica");
  return await resp.json();
};

// ✅ Actualizar una característica (solo ADMIN)
export const updateFeature = async (id, featureData) => {
  const resp = await fetch(`${API_BASE_URL}/features/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(featureData),
  });
  if (!resp.ok) throw new Error("Error actualizando la característica");
  return await resp.json();
};

// ✅ Eliminar una característica (solo ADMIN)
export const deleteFeature = async (id) => {
  const resp = await fetch(`${API_BASE_URL}/features/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!resp.ok) {
    const errorData = await resp.json().catch(() => null);
    throw new Error(errorData?.message || "Error eliminando la característica");
  }

  return true;
};
