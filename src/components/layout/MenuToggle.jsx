import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  FaHeart,
  FaSignOutAlt
} from "react-icons/fa";
import "../../styles/components/layout/MenuToggle.css";
import LoginModal from "../auth/LoginModal.jsx";
import RegisterModal from "../auth/RegisterModal.jsx"; // 👈 nuevo import

const MenuToggle = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // 👈 nuevo estado
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    setOpen(false);
    window.location.reload(); // ✅ asegura reinicio limpio
  };

  const getInitials = (name) => name?.charAt(0)?.toUpperCase() || "?";

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className="menu-toggle" ref={menuRef}>
      {user ? (
        <button className="menu-button" onClick={toggleMenu}>
          <span className="avatar">{getInitials(user.firstName)}</span>
          <span className="menu-lines">☰</span>
        </button>
      ) : (
        <div className="auth-buttons">
          <button className="btn btn-primary" onClick={() => setShowLogin(true)}>
            Iniciar sesión
          </button>
          <button className="btn btn-outline" onClick={() => setShowRegister(true)}>
            Crear cuenta
          </button>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}

      {open && user && (
        <div className="menu-dropdown">
          <button className="menu-item" onClick={() => navigate("/favorites")}>
            <FaHeart /> Favoritos
          </button>
          <button className="menu-item logout" onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuToggle;
