import React from "react";
import "../../styles/components/Footer.css";
import logo from "../../assets/logo.png"; // usa el logo que ya tienes

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Naturalia logo" className="footer-logo" />
          <span>&copy; {year} Naturalia. Todos los derechos reservados.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
