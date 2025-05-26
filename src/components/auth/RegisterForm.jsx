import React, { useState } from 'react';
import { registerUser } from '../../services/authService';

const initialForm = {
  firstname: '',
  lastname: '',
  email: '',
  password: ''
};

const RegisterForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    if (!form.firstname || !form.lastname || !form.email || !form.password) {
      return 'Todos los campos son obligatorios';
    }
    if (!form.email.includes('@')) {
      return 'El correo debe ser válido';
    }
    if (form.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const validationError = validateFields();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      setSuccessMsg('Registro exitoso. Ahora puedes iniciar sesión.');
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(err.message || 'Ocurrió un error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-form">
      <h2>Crear cuenta</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="Nombre"
          value={form.firstname}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastname"
          placeholder="Apellido"
          value={form.lastname}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;