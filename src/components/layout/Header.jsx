import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/components/Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    return name?.charAt(0)?.toUpperCase() || '?';
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
              <div className="avatar">{getInitials(user.name)}</div>
              <button className='closeSession' onClick={logout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
