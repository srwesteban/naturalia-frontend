import React from 'react';
import RegisterForm from '../auth/RegisterForm';
import '../../styles/components/auth/LoginModal.css';

const RegisterModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        <RegisterForm onRegisterSuccess={onClose} />
      </div>
    </div>
  );
};

export default RegisterModal;
