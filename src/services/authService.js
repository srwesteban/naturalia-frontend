const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_URL = `${BASE_URL}/auth`;

// Registro de usuario
export const registerUser = async (formData) => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || 'Registration failed');
  }

  return await response.json();
};

// Inicio de sesión
export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || 'Login failed');
  }

  return await response.json();
};

// Obtiene el rol desde el token JWT
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// Obtiene datos básicos del usuario desde el token
export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return {
      id: payload.id,
      role: payload.role,
      firstName: payload.sub,
    };
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
};

// Obtiene el ID del usuario autenticado desde el backend
export const getUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${AUTH_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Not authenticated');
  }

  const data = await response.json();
  return data.id;
};
