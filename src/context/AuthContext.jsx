import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserInfo } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("🔐 Token decodificado:", decoded);
        setUser({
          name: decoded.firstname || decoded.sub,
          email: decoded.email,
          role: decoded.role,
          firstName: decoded.firstname || decoded.sub,
        });
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    loadUser(); // ✅ recarga el usuario completo del nuevo token
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading, loadUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
