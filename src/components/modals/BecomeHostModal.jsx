import React, { useState } from "react";
import "../../styles/components/modals/BecomeHostModal.css";
import { changeMyRole } from "../../services/userService";
import { getUserId } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const BecomeHostModal = ({ onClose }) => {
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // usamos login para actualizar el contexto

  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    const userId = await getUserId();

    try {
      const { token } = await changeMyRole(userId, "HOST");
      login(token); // actualiza el usuario en el contexto con nuevo rol
      onClose();
    } catch (err) {
      console.error("Error al cambiar rol a HOST:", err);
      setError(
        "Ocurrió un error al intentar cambiar tu rol. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Conviértete en Host</h2>
        <p>
          Al convertirte en host, podrás publicar y administrar tus alojamientos
          en nuestra plataforma. Acepta nuestros términos para continuar:
        </p>
        <div className="terms-box">
          <p>
            Al utilizar esta plataforma como anfitrión, aceptas cumplir con
            nuestras políticas de seguridad, limpieza, comunicación y reembolso.
            Te comprometes a proporcionar información veraz sobre tus
            alojamientos, mantenerlos en condiciones óptimas, respetar los
            tiempos de reserva y comunicarte de forma clara y oportuna con los
            huéspedes. Asimismo, entiendes que las cancelaciones injustificadas
            pueden afectar tu reputación y visibilidad en la plataforma. Tu
            responsabilidad es garantizar una experiencia segura, honesta y de
            calidad para todos los usuarios.
          </p>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          Acepto los términos y condiciones
        </label>

        {error && <p className="error-msg">{error}</p>}

        <div className="modal-buttons">
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            disabled={!accepted || loading}
            onClick={handleAccept}
          >
            {loading ? "Procesando..." : "Aceptar y Convertirme en Host"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BecomeHostModal;
