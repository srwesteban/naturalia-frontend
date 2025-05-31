import React, { useState } from 'react';
import { registerUser } from '../../services/authService';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../../styles/components/auth/RegisterForm.css';

const initialForm = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  documentType: '',
  documentNumber: '',
  phoneNumber: '',
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
    if (
      !form.firstname ||
      !form.lastname ||
      !form.email ||
      !form.password ||
      !form.documentType ||
      !form.documentNumber ||
      !form.phoneNumber
    ) {
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
      const payload = {
        ...form,
        phoneNumber: `+${form.phoneNumber.replace(/\D/g, '')}`,
      };
      await registerUser(payload);
      setSuccessMsg('Registro exitoso. Ahora puedes iniciar sesión.');
      setForm(initialForm);
    } catch (err) {
      setErrorMsg(err.message || 'Ocurrió un error en el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Crear cuenta</h2>

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

        <select
          className="documentType"
          name="documentType"
          value={form.documentType}
          onChange={handleChange}
        >
          <option value="">Tipo de documento</option>
          <option value="CC">Cédula de ciudadanía</option>
          <option value="CE">Cédula de extranjería</option>
          <option value="PASSPORT">Pasaporte</option>
        </select>

        <input
          type="text"
          name="documentNumber"
          placeholder="Número de documento"
          value={form.documentNumber}
          onChange={handleChange}
        />

        <PhoneInput
          country={'co'}
          value={form.phoneNumber}
          onChange={(phone) => setForm({ ...form, phoneNumber: phone })}
          inputProps={{
            name: 'phoneNumber',
            required: true,
          }}
          inputStyle={{ width: '100%', height: '38px' }}
          placeholder="Número de teléfono"
          enableSearch={true}
          countryCodeEditable={false}
        />

        <button type="submit" disabled={loading} style={{ marginTop: '16px', width: '100%' }}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </section>
  );
};

export default RegisterForm;
