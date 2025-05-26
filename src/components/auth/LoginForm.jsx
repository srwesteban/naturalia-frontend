
import { useState } from 'react';
import { loginUser } from '../../services/authService';


const initialForm = {
  email: '',
  password: ''
};

const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await loginUser(form);
      localStorage.setItem('token', res.token);
      if (onLoginSuccess) onLoginSuccess(res.token);
    } catch (err) {
      setErrorMsg('Credenciales inválidas o error de red.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form">
      <h2>Iniciar sesión</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
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
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;