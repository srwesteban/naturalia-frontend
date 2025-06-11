const API_URL = import.meta.env.VITE_API_BASE_URL;

// --------------------------------------------------
// 🔐 AUTH HELPERS
// --------------------------------------------------

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

export const decodeToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.userId || payload.id;
  } catch (err) {
    console.error("Error al decodificar token:", err);
    return null;
  }
};

// --------------------------------------------------
// 👤 USUARIOS
// --------------------------------------------------

export const getAllUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

export const getHosts = async () => {
  const res = await fetch(`${API_URL}/users/hosts`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Error al cargar hosts");
  return await res.json(); // [{id, firstname, lastname}]
};

// --------------------------------------------------
// 🎭 ROLES
// --------------------------------------------------

export const changeMyRole = async (userId, newRole) => {
  const allowedRoles = ["USER", "HOST"];
  if (!allowedRoles.includes(newRole)) {
    throw new Error("Rol no permitido. Solo puedes cambiar entre USER y HOST.");
  }

  const response = await fetch(
    `${API_URL}/users/${userId}/role?role=${newRole}`,
    {
      method: "PUT",
      headers: authHeaders(),
    }
  );

  if (!response.ok) throw new Error(await response.text());

  const data = await response.json();

  // Si el backend devuelve un nuevo token (por cambio de rol)
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};

export const changeUserRole = async (userId, newRole) => {
  const res = await fetch(
    `${API_URL}/users/${userId}/role?role=${newRole}`,
    {
      method: "PUT",
      headers: authHeaders(),
    }
  );

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};
