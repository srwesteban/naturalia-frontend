import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  FaHeart,
  FaSignOutAlt,
  FaCalendarAlt,
  FaUserPlus,
  FaBalanceScale,
  FaUser,
} from "react-icons/fa";
import "../../styles/components/layout/MenuToggle.css";
import LoginModal from "../auth/LoginModal.jsx";
import RegisterModal from "../auth/RegisterModal.jsx";
import BecomeHostModal from "../modals/BecomeHostModal.jsx";

const MenuToggle = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showHostModal, setShowHostModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role;
  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
    window.location.reload();
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
        <>
          <button className="menu-button" onClick={toggleMenu}>
            <div className="avatar-wrapper">
              <span className="avatar">
                {getInitials(user.firstName)}
                {role !== "USER" && (
                  <span className="role-label-inline">
                    {role === "HOST" ? "HOST" : "ADMIN"}
                  </span>
                )}
              </span>
            </div>
            <span className="menu-lines">☰</span>
          </button>

          {open && (
            <div className="menu-dropdown">
              <button className="menu-item" onClick={() => navigate("/favorites")}>
                <FaHeart /> Favoritos
              </button>

              <button className="menu-item" onClick={() => navigate("/reservations")}>
                <FaCalendarAlt /> Mis Reservaciones
              </button>

              <button className="menu-item" onClick={() => navigate("/policies")}>
                <FaBalanceScale /> Politicas de uso
              </button>

              {role === "HOST" && (
                <button className="menu-item">
                  <FaUser /> Vista de usuario
                </button>
              )}

              {role === "USER" && (
                <button className="menu-item" onClick={() => setShowHostModal(true)}>
                  <FaUserPlus /> Conviértete en Host
                </button>
              )}

              <button className="menu-item logout" onClick={handleLogout}>
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </div>
          )}
        </>
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
      {showHostModal && <BecomeHostModal onClose={() => setShowHostModal(false)} />}
    </div>
  );
};

export default MenuToggle;
