import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/layout/Header.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';

const Header = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name) => {
    return name?.charAt(0)?.toUpperCase() || '?';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Naturalia logo" className="logo" />
          </Link>
          <span className="slogan">
            Glampings y Alojamientos Campestres - Reencuéntrate con la naturaleza
          </span>
        </div>

        <div className="header-right">
          {!user ? (
            <>
              <Link to="/login"><button className="btn-primary">Iniciar sesión</button></Link>
              <Link to="/registry"><button className="btn-outline">Crear cuenta</button></Link>
            </>
          ) : (
            <div className="user-avatar-wrapper">
              <div className="avatar" onClick={toggleMenu}>
                {getInitials(user.name)}
              </div>
              <div className="menu-toggle" onClick={toggleMenu}>
                <div className="dot"></div>
              </div>
              {menuOpen && (
                <div className="dropdown-menu">
                  <button onClick={() => navigate('/favorites')} className="dropdown-item">
                    <AiOutlineHeart /> Listas de favoritos
                  </button>
                  <button onClick={handleLogout} className="dropdown-item">
                    <MdLogout /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
