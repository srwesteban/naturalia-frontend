import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/modals/FakePayModal.css";

const FakePayModal = ({
  isOpen,
  onClose,
  onSuccess,
  totalPrice,
  pricePerNight,
  checkIn,
  checkOut,
}) => {
  const [processing, setProcessing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const nights = Math.ceil(
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  );

  const handleConfirm = async () => {
    setProcessing(true);
    setFeedback("💳 Procesando pago...");

    setTimeout(async () => {
      try {
        await onSuccess(); // Aquí crea la reserva
        setFeedback("✅ ¡Reserva realizada con éxito!");
        setTimeout(() => {
          setProcessing(false);
          setFeedback("");
          onClose();
          navigate("/reservations"); // Redirige al historial
        }, 2000);
      } catch (err) {
        setFeedback("❌ Error al procesar tu reserva.");
        setProcessing(false);
      }
    }, 2000);
  };

  return (
    <div className="fakepay-backdrop">
      <div className="fakepay-modal">
        <h3>Resumen de tu reserva</h3>

        <p><strong>Fechas:</strong></p>
        <p>{checkIn} → {checkOut}</p>

        <p><strong>Noches:</strong> {nights} noche{nights > 1 ? "s" : ""}</p>
        <p><strong>Precio por noche:</strong> ${pricePerNight.toLocaleString("es-CO")}</p>
        <p><strong>Total:</strong> ${totalPrice.toLocaleString("es-CO")}</p>

        {feedback && <p className="feedback-msg">{feedback}</p>}

        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleConfirm} disabled={processing}>
            {processing ? "Procesando..." : "Confirmar reserva"}
          </button>
          <button className="cancel-button" onClick={onClose} disabled={processing}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FakePayModal;
