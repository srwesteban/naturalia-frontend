import React, { useState, useEffect } from "react";
import "../../styles/components/CreateStayForm.css";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import { getFeatures } from "../../services/featureService";
import { getCategories } from "../../services/categoryService";
import { getHosts } from "../../services/userService"; // <-- nuevo
import { getUserRole } from "../../services/authService"; // <-- nuevo

const initialForm = {
  name: "",
  description: "",
  location: "",
  capacity: 1,
  pricePerNight: 0,
  images: [],
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  latitude: 0,
  longitude: 0,
  hostId: null,
};

const CreateStayForm = () => {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);
  const [features, setFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    getFeatures().then(setFeatures).catch(console.error);
    getCategories().then(setCategories).catch(console.error);

    const role = getUserRole(); 
    setRole(role);

    if (role === "ADMIN") {
      getHosts().then(setHosts).catch(console.error);
    }
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

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
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
        categoryIds: selectedCategories,
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
      setSelectedCategories([]);
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

        <div className="inline">
          <div>
            <label>Habitaciones</label>
            <input
              type="number"
              name="bedrooms"
              min="0"
              value={form.bedrooms}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Camas</label>
            <input
              type="number"
              name="beds"
              min="0"
              value={form.beds}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Baños</label>
            <input
              type="number"
              name="bathrooms"
              min="0"
              value={form.bathrooms}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="inline">
          <div>
            <label>Latitud</label>
            <input
              type="number"
              name="latitude"
              step="0.0001"
              value={form.latitude}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Longitud</label>
            <input
              type="number"
              name="longitude"
              step="0.0001"
              value={form.longitude}
              onChange={handleChange}
            />
          </div>
        </div>

        {role === "ADMIN" && (
          <div>
            <label>Anfitrión</label>
            <select
              name="hostId"
              value={form.hostId || ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un anfitrión</option>
              {hosts.map((host) => (
                <option key={host.id} value={host.id}>
                  {host.name} ({host.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <label>Imágenes (min 1, máx 5)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <label>Características</label>
        <h1></h1>
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

        <label>Categorías</label>
        <h1></h1>
        <div className="features-checkboxes">
          {categories.map((c) => (
            <div key={c.id} className="feature-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.id)}
                onChange={() => toggleCategory(c.id)}
              />
              <div className="feature-label">
                {/* <img
                  src={c.imageUrl}
                  alt={c.title}
                  style={{ width: 20, marginRight: 5 }}
                /> */}
                {c.title}
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
