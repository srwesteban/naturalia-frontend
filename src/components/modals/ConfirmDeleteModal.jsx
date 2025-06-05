import React from 'react';
import '../../styles/components/modals/ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ onClose, onConfirm, entityName = "este elemento", title = "¿Eliminar?", warning, error }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h3>{title}</h3>
        <p>
          ¿Estás seguro de que deseas eliminar <strong>{entityName}</strong>? Esta acción no se puede deshacer.
        </p>
        {warning && <p className="warning-text">⚠ {warning}</p>}
        {error && <p className="error-message">❌ {error}</p>}
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="confirm-btn" onClick={onConfirm}>Sí, eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
