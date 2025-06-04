import { createContext, useContext, useState, useEffect } from "react";
import { getUserInfo } from "../services/authService";

export const AuthContext = createContext(); // 👈 esta línea es la clave

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const info = getUserInfo();
      if (info) {
        setUser(info);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    const info = getUserInfo();
    if (info) {
      setUser(info);
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    window.location.reload(); // ✅ limpia todo
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
