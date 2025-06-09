
import React from "react";
import { toast } from "react-toastify";
import { FaWhatsapp } from "react-icons/fa";
import "../../styles/components/whatsapp/WhatsAppButton.css";

const WhatsAppButton = () => {
  const phoneNumber = "573215098953";
  const message = "Hola, tengo una pregunta sobre uno de sus alojamientos.";

  const handleClick = () => {
    try {
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    } catch (error) {
      toast.error("Error al abrir WhatsApp. Verifica tu conexión.");
    }
  };

  return (
    <button className="whatsapp-button" onClick={handleClick} aria-label="Contactar por WhatsApp">
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsAppButton;
