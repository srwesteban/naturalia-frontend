import React from 'react';
import '../../styles/components/modals/ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ onClose, onConfirm, stayName }) => {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h3>¿Eliminar alojamiento?</h3>
        <p>¿Estás seguro de que deseas eliminar <strong>{stayName}</strong>? Esta acción no se puede deshacer.</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancelar</button>
          <button className="confirm-btn" onClick={onConfirm}>Sí, eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
