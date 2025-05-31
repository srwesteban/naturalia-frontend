const BASE_URL = 'http://localhost:8080';
const AUTH_URL = `${BASE_URL}/auth`;

export const registerUser = async (formData) => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || 'Error en el registro');
  }

  return await response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Error en el inicio de sesión');
  }

  return await response.json();
};

// Extrae el rol desde el token almacenado
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (err) {
    console.error("Token inválido", err);
    return null;
  }
};

// Extrae info básica del usuario desde el token
export const getUserInfo = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id, // Asegúrate de que se incluya en el token
      role: payload.role,
      firstName: payload.sub,
    };
  } catch (err) {
    console.error("Token inválido", err);
    return null;
  }
};

export const getUserId = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch("http://localhost:8080/auth/me", {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('No autenticado');
  }

  const data = await response.json();
  return data.id;
};
