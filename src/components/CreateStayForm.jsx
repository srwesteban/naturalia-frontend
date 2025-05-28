import React, { useState, useEffect } from "react";
import "../styles/components/CreateStayForm.css";
import { uploadImageToCloudinary } from "../services/cloudinary";
import { getFeatures } from "../services/featureService";

const initialForm = {
  name: "",
  description: "",
  location: "",
  capacity: 1,
  pricePerNight: 0,
  type: "GLAMPING",
  images: [],
};

const CreateStayForm = () => {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getFeatures()
      .then(setFeatures)
      .catch((err) => console.error("Error cargando características:", err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const toggleFeature = (id) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const uploadAllImages = async () => {
    const urls = [];
    for (const file of files) {
      const url = await uploadImageToCloudinary(file);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    if (files.length < 1 || files.length > 5) {
      setErrorMsg("Debes subir entre 1 y 5 imágenes.");
      setLoading(false);
      return;
    }

    try {
      const imageUrls = await uploadAllImages();
      const payload = {
        ...form,
        images: imageUrls,
        featureIds: selectedFeatures,
      };

      const response = await fetch("http://localhost:8080/stays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const msg = await response.text();
        if (msg === "DUPLICATE_NAME") {
          setErrorMsg("Ya existe un alojamiento con ese nombre.");
        } else {
          setErrorMsg("Ocurrió un error inesperado. Intenta de nuevo.");
        }
        return;
      }

      setSuccessMsg("¡Alojamiento creado con éxito!");
      setForm(initialForm);
      setFiles([]);
      setSelectedFeatures([]);
    } catch (err) {
      setErrorMsg("Error de red o del servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-stay">
      <h2>Agregar nuevo alojamiento</h2>

      {errorMsg && <p className="error">{errorMsg}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <label>Nombre*</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <label>Ubicación</label>
        <input name="location" value={form.location} onChange={handleChange} />

        <div className="inline">
          <div>
            <label>Capacidad</label>
            <input
              type="number"
              name="capacity"
              min="1"
              value={form.capacity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Precio / noche (USD)</label>
            <input
              type="number"
              name="pricePerNight"
              step="0.01"
              value={form.pricePerNight}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Tipo</label>
        <select name="type" value={form.type} onChange={handleChange}>
          <option value="GLAMPING">Glamping</option>
          <option value="COUNTRY_HOUSE">Casa Campestre</option>
        </select>

        <label>Imágenes (min 1, máx 5)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <label>Características</label>
        <div className="features-checkboxes">
          {features.map((f) => (
            <div key={f.id} className="feature-item">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(f.id)}
                onChange={() => toggleFeature(f.id)}
              />
              <div className="feature-label">
                <i className={`fa ${f.icon}`}></i> {f.name}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Subiendo…" : "Agregar Alojamiento"}
        </button>
      </form>
    </section>
  );
};

export default CreateStayForm;
