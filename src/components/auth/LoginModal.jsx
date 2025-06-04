import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import '../../styles/components/auth/LoginModal.css';

const LoginModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        <LoginForm onLoginSuccess={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;
