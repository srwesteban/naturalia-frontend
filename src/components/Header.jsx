import '../styles/components/Header.css';
import { Link } from 'react-router-dom';
import  logo  from '../assets/Logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Naturalia logo" className="logo" />
        </Link>
          <span className="slogan">Glamppings y Alojamientos Campestres - Reencuentrate con la naturaleza</span>
      </div>
      <div className="header-right">
        <button className="btn-primary">Iniciar sesión</button>
        <button className="btn-outline">Crear cuenta</button>
      </div>
    </header>
  );
};

export default Header;
