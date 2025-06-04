import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { useAuth } from '../../context/AuthContext'; // 👈 Asegúrate de importar bien
import '../../styles/components/auth/LoginForm.css';

const initialForm = {
  email: '',
  password: ''
};

const LoginForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { loadUser } = useAuth(); // ✅ Esto sí es válido aquí (dentro del componente)

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
      loadUser(); // ✅ Actualiza el contexto
      navigate('/');
    } catch (err) {
      setErrorMsg('Correo o contraseña incorrectos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Iniciar sesión</h2>

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

        <button type="submit" disabled={loading} style={{ marginTop: '16px', width: '100%' }}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  );
};

export default LoginForm;
