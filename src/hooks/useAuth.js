import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("🔐 Token decodificado:", decoded);
        setUser({
          id: decoded.id,
          name: decoded.firstname || decoded.sub,
          email: decoded.email,
          role: decoded.role,
        });
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false); // ✅ finalizar carga
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return { user, logout, loading }; // 👈 importante
};
