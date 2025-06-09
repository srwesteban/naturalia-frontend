import React from "react";
import "../../styles/layout/Footer.css";
import logo from "../../assets/logo.png";
import WhatsAppButton from "../../components/whatsapp/WhatsAppButton";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="Naturalia logo" className="footer-logo" />
          <span>
            &copy; {year} Naturalia. Todos los derechos reservados. Creado por{" "}
            <strong>William David Esteban Mora.</strong>
          </span>
          <span>
            ¿Quieres una web como esta para tu negocio? Contactame 📧{" "}
            <a href="mailto:sr.w@hotmail.com">sr.w@hotmail.com</a>
          </span>
        </div>

        <div>
          <WhatsAppButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
