import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useAuth } from "../../context/AuthContext.jsx";
import MenuToggle from "./MenuToggle";
import "../../styles/layout/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <a href="/" className="logo-link">
            <img src={logo} alt="Naturalia logo" className="logo" />
          </a>
        </div>
        <span className="slogan-centered">
          Glampings y Alojamientos Campestres - Reencuéntrate con la naturaleza
        </span>
        <div className="header-right">
          <MenuToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
