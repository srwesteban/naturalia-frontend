import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHeart,
  FaSignOutAlt,
  FaCalendarAlt,
  FaUserPlus,
  FaBalanceScale,
  FaUserAlt,
  FaSyncAlt,
  FaPlusSquare,
  FaHome,
  FaClipboardList,
  FaUsersCog,
  FaTools,
  FaThList,
  FaBuilding,
} from "react-icons/fa";
import "../../styles/components/layout/MenuToggle.css";
import LoginModal from "../auth/LoginModal.jsx";
import RegisterModal from "../auth/RegisterModal.jsx";
import BecomeHostModal from "../modals/BecomeHostModal.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const MenuToggle = () => {
  const {
    user,
    logout,
    temporaryUserView,
    enableUserView,
    disableUserView,
    effectiveRole,
  } = useAuth();

  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showHostModal, setShowHostModal] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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
                <span className="role-label-inline">
                  {temporaryUserView ? `${effectiveRole}` : user.role}
                </span>
              </span>
            </div>
            <span className="menu-lines">☰</span>
          </button>

          {open && (
            <div className="menu-dropdown">
              {/* ADMIN MENU */}
              {user.role === "ADMIN" ? (
                <>
                  <button className="menu-item" onClick={() => navigate("/")}>
                    <FaHome /> Inicio
                  </button>
                  <button
                    className="menu-item"
                    onClick={() => navigate("/adminstay")}
                  >
                    <FaClipboardList /> Panel de Alojamiento
                  </button>
                  <button
                    className="menu-item"
                    onClick={() => navigate("/adminrol")}
                  >
                    <FaUsersCog /> Panel de Usuarios
                  </button>
                  <button
                    className="menu-item"
                    onClick={() => navigate("/adminfeatures")}
                  >
                    <FaTools /> Características
                  </button>
                  <button
                    className="menu-item"
                    onClick={() => navigate("/admincategory")}
                  >
                    <FaThList /> Categorías
                  </button>
                </>
              ) : (
                <>
                  {/* USER */}
                  <button className="menu-item" onClick={() => navigate("/")}>
                    <FaHome /> Inicio
                  </button>

                  {effectiveRole === "USER" && (
                    <button
                      className="menu-item"
                      onClick={() => navigate("/favorites")}
                    >
                      <FaHeart /> Favoritos
                    </button>
                  )}

                  {effectiveRole === "HOST" && (
                    <button
                      className="menu-item"
                      onClick={() => navigate("/createstay")}
                    >
                      <FaPlusSquare /> Agregar alojamiento
                    </button>
                  )}
                  {effectiveRole === "HOST" && (
                    <button
                      className="menu-item"
                      onClick={() => navigate("/mystays")}
                    >
                      <FaBuilding /> Mis alojamientos
                    </button>
                  )}

                  {effectiveRole === "USER" && (
                    <button
                      className="menu-item"
                      onClick={() => navigate("/reservations")}
                    >
                      <FaCalendarAlt /> Mis Reservaciones
                    </button>
                  )}

                  {user.role === "HOST" && !temporaryUserView && (
                    <button className="menu-item" onClick={enableUserView}>
                      <FaUserAlt /> Vista de Usuario
                    </button>
                  )}

                  {temporaryUserView && (
                    <button className="menu-item" onClick={disableUserView}>
                      <FaSyncAlt /> Volver a Vista Host
                    </button>
                  )}

                  {effectiveRole === "USER" && !temporaryUserView && (
                    <button
                      className="menu-item"
                      onClick={() => setShowHostModal(true)}
                    >
                      <FaUserPlus /> Conviértete en Host
                    </button>
                  )}

                  <button
                    className="menu-item"
                    onClick={() => navigate("/policies")}
                  >
                    <FaBalanceScale /> Políticas de uso
                  </button>
                </>
              )}

              <button className="menu-item logout" onClick={handleLogout}>
                <FaSignOutAlt /> Cerrar sesión
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="auth-buttons">
          <button
            className="btn btn-primary"
            onClick={() => setShowLogin(true)}
          >
            Iniciar sesión
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setShowRegister(true)}
          >
            Crear cuenta
          </button>
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showHostModal && (
        <BecomeHostModal onClose={() => setShowHostModal(false)} />
      )}
    </div>
  );
};

export default MenuToggle;
