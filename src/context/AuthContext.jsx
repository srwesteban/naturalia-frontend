import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [temporaryUserView, setTemporaryUserView] = useState(false);

  const enableUserView = () => setTemporaryUserView(true);
  const disableUserView = () => setTemporaryUserView(false);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setTemporaryUserView(false);
    toast.warn("Tu sesión ha expirado. Por favor inicia sesión.");
    setTimeout(() => {
      window.location.href = "/"; // o "/login"
    }, 1500);
  };

  const loadUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiration = decoded.exp * 1000;
        const isExpired = Date.now() > expiration;

        if (isExpired) {
          logout();
          return;
        }

        setUser({
          name: decoded.firstname || decoded.sub,
          email: decoded.email,
          role: decoded.role,
          firstName: decoded.firstname || decoded.sub,
          realRole: decoded.role,
        });
        setIsAuthenticated(true);
      } catch (e) {
        console.error("❌ Token inválido:", e.message);
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

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          const expiration = decoded.exp * 1000;
          if (Date.now() > expiration) {
            logout();
          }
        } catch (e) {
          logout();
        }
      }
    }, 60000); // Revisa cada 60 segundos

    return () => clearInterval(interval);
  }, []);

  const login = (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    loadUser();
  };

  const effectiveRole =
    temporaryUserView && user?.role === "HOST" ? "USER" : user?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
        loading,
        loadUser,
        effectiveRole,
        temporaryUserView,
        enableUserView,
        disableUserView,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
