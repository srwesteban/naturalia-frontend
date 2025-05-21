import '../styles/components/Header.css';
import { Link } from 'react-router-dom';
import  logo  from '../assets/Logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Naturalia logo" className="logo" />
          <span className="slogan">Naturalia — Glamping & Escapadas</span>
        </Link>
      </div>
      <div className="header-right">
        <button className="btn-outline">Crear cuenta</button>
        <button className="btn-primary">Iniciar sesión</button>
      </div>
    </header>
  );
};

export default Header;
