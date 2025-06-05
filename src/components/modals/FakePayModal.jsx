import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/modals/FakePayModal.css';

const FakePayModal = ({ isOpen, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('validando'); // validando → procesando → exito | error

  useEffect(() => {
    if (!isOpen) return;

    const sequence = async () => {
      setStatus('validando');
      await new Promise((res) => setTimeout(res, 1000));

      setStatus('procesando');
      await new Promise((res) => setTimeout(res, 1000));

      const success = Math.random() > 0.1; // 90% chance de éxito
      setStatus(success ? 'exito' : 'error');

      setTimeout(() => {
        if (success) {
          onSuccess();
        } else {
          onClose();
        }
        navigate('/reservations');
      }, 2000);
    };

    sequence();
  }, [isOpen, navigate, onClose, onSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fakepay-backdrop">
      <div className="fakepay-modal">
        {status === 'validando' && <p>🔎 Validando datos bancarios...</p>}
        {status === 'procesando' && <p>💳 Procesando pago...</p>}
        {status === 'exito' && <p className="success">✅ Pago exitoso</p>}
        {status === 'error' && <p className="error">❌ Pago rechazado</p>}
      </div>
    </div>
  );
};

export default FakePayModal;
