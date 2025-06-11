import React, { useState } from "react";
import { registerUser, loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import PhoneInput from "react-phone-input-2";
import Select from "react-select"; // 👈 nuevo
import "react-phone-input-2/lib/style.css";
import "../../styles/components/auth/RegisterForm.css";

const initialForm = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  documentType: "",
  documentNumber: "",
  phoneNumber: "",
};

const documentOptions = [
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PASSPORT", label: "Pasaporte" },
];

const RegisterForm = ({ onRegisterSuccess }) => {
  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    if (
      !form.firstname ||
      !form.email ||
      !form.password ||
      !form.documentType ||
      !form.documentNumber ||
      !form.phoneNumber
    ) {
      return "Todos los campos obligatorios deben ser completados";
    }
    if (!form.email.includes("@")) {
      return "El correo debe ser válido";
    }
    if (form.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateFields();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        phoneNumber: `+${form.phoneNumber.replace(/\D/g, "")}`,
      };

      await registerUser(payload);

      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      login(res.token);
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      let msg = "Ocurrió un error en el registro";
      if (
        err.message.includes("duplicate key") ||
        err.message.includes("already exists")
      ) {
        msg =
          "Ya existe un usuario registrado con ese número de documento o correo.";
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form-card" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>
        {errorMsg && <p className="error">{errorMsg}</p>}

        <div className="form-grid">
          <div>
            <label>Nombre *</label>
            <input
              type="text"
              name="firstname"
              placeholder="Ej: Juan"
              value={form.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              type="text"
              name="lastname"
              placeholder="Ej: Pérez"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Correo electrónico *</label>
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
            <label>Contraseña *</label>
            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
          </div>

          <div className="selector">
            <label>Tipo de documento *</label>
            <Select
              options={documentOptions}
              placeholder="Selecciona una opción"
              value={documentOptions.find(
                (opt) => opt.value === form.documentType
              )}
              onChange={(selected) =>
                setForm({
                  ...form,
                  documentType: selected ? selected.value : "",
                })
              }
              styles={{
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9999,
                }),
              }}
            />
          </div>

          <div>
            <label>Número de documento *</label>
            <input
              type="text"
              name="documentNumber"
              placeholder="Ej: 1020481792"
              value={form.documentNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ gridColumn: "1 / 3" }}>
            <label>Número de teléfono *</label>
            <PhoneInput
              country={"co"}
              value={form.phoneNumber}
              onChange={(phone) => setForm({ ...form, phoneNumber: phone })}
              inputProps={{ name: "phoneNumber", required: true }}
              inputStyle={{ width: "100%", height: "38px" }}
              placeholder="Ej: 3101234567"
              enableSearch={true}
              countryCodeEditable={false}
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
