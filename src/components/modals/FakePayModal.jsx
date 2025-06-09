import React from "react";
import "../../styles/components/modals/FakePayModal.css";

const FakePayModal = ({ isOpen, onClose, onSuccess, totalPrice, pricePerNight, checkIn, checkOut }) => {
  if (!isOpen) return null;

  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Resumen de tu reserva</h3>

        <p><strong>Fechas:</strong></p>
        <p>{checkIn} → {checkOut}</p>

        <p><strong>Noches:</strong> {nights} noche{nights > 1 ? "s" : ""}</p>
        <p><strong>Precio por noche:</strong> ${pricePerNight.toLocaleString("es-CO")}</p>
        <p><strong>Total:</strong> ${totalPrice.toLocaleString("es-CO")}</p>

        <div className="modal-buttons">
          <button className="confirm-button" onClick={onSuccess}>Confirmar reserva</button>
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default FakePayModal;
