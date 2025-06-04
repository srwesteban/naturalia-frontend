import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";
import {
  FaUserCircle,
  FaHeart,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import "../../styles/components/layout/MenuToggle.css";

const MenuToggle = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/"); // redirige y actualiza
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
    setOpen(false); // Cierra menú si cambia la ruta
  }, [location]);

  return (
    <div className="menu-toggle" ref={menuRef}>
      {user ? (
        <button className="menu-button" onClick={toggleMenu}>
          <span className="avatar">{getInitials(user.name)}</span>
          <span className="menu-lines">☰</span>
        </button>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="btn btn-primary">
            Iniciar sesión
          </Link>
          <Link to="/registry" className="btn btn-outline">
            Crear cuenta
          </Link>
        </div>
      )}

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
