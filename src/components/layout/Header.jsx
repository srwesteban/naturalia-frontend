import { Link } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { useAuth } from '../../hooks/useAuth.jsx';
import MenuToggle from './MenuToggle'; // Asegúrate que la ruta coincida
import '../../styles/layout/Header.css';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo + slogan */}
        <div className="header-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Naturalia logo" className="logo" />
          </Link>
          <span className="slogan">
            Glampings y Alojamientos Campestres - Reencuéntrate con la naturaleza
          </span>
        </div>

        {/* Botones o menú según autenticación */}
        <div className="header-right">
          <MenuToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
