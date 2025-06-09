import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/components/auth/LoginForm.css";

const initialForm = {
  email: "",
  password: "",
};

const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await loginUser(form);
      login(res.token);
      if (onLoginSuccess) onLoginSuccess();
      navigate(0);
    } catch (err) {
      setErrorMsg("Correo o contraseña incorrectos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form-card" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <div>
          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Ej: juan@gmail.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Tu contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
