import React, { useState, useEffect } from "react";
import "../../styles/components/CreateStayForm.css";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import { getFeatures } from "../../services/featureService";
import { getCategories } from "../../services/categoryService";
import { getHosts } from "../../services/userService";
import { getUserRole } from "../../services/authService";
import { createStay } from "../../services/stayService"; // ✅ CORRECTO
import MapOnly from "../Location/MapOnly";
import LocationManualInput from "../../components/Location/LocationManualInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

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
    setFormErrors({});

    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!form.location.trim())
      newErrors.location = "La ubicación es obligatoria.";
    if (form.pricePerNight <= 0)
      newErrors.pricePerNight = "El precio debe ser mayor a cero.";

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      setLoading(false);
      return;
    }

    if (files.length < 1 || files.length > 5) {
      toast.error("Debes subir entre 1 y 5 imágenes.");
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

      const createdStay = await createStay(payload);

      toast.success(
        <div>
          ¡Alojamiento creado con éxito!
          <button
            style={{
              marginLeft: "1rem",
              backgroundColor: "#f1f1f1",
              color: "#333",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px 8px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/stays/${createdStay.id}`)}
          >
            Ver alojamiento
          </button>
        </div>,
        { autoClose: 5000 }
      );

      setForm(initialForm);
      setFiles([]);
      setSelectedFeatures([]);
      setSelectedCategories([]);
    } catch (err) {
      if (err.message === "DUPLICATE_NAME") {
        toast.error("Ya existe un alojamiento con ese nombre.");
      } else {
        toast.error("Ocurrió un error inesperado. Intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="create-stay">
      <h2>Agregar nuevo alojamiento</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre*</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className={formErrors.name ? "error-input" : ""}
        />
        {formErrors.name && <p className="field-error">{formErrors.name}</p>}

        <label>Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <label>Ubicación (país, región, ciudad)*</label>
        <LocationManualInput
          value={form.location}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, location: value }))
          }
        />
        {formErrors.location && (
          <p className="field-error">{formErrors.location}</p>
        )}

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
            <label>Precio / noche (COP)</label>
            <input
              type="text"
              name="pricePerNight"
              value={form.pricePerNight.toLocaleString("es-CO")}
              onChange={(e) => {
                const raw = e.target.value.replace(/\./g, "");
                const numeric = parseInt(raw, 10) || 0;
                setForm((prev) => ({ ...prev, pricePerNight: numeric }));
              }}
              className={formErrors.pricePerNight ? "error-input" : ""}
            />
            {formErrors.pricePerNight && (
              <p className="field-error">{formErrors.pricePerNight}</p>
            )}
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
              {hosts.length > 0 ? (
                hosts.map((host) => (
                  <option key={host.id} value={host.id}>
                    {host.firstname} {host.lastname}
                  </option>
                ))
              ) : (
                <option disabled value="">
                  No hay anfitriones disponibles
                </option>
              )}
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

        <div className="map">
          <h2>Escoge la ubicación en el mapa</h2>
          <MapOnly
            onCoordinatesChange={({ lat, lng }) =>
              setForm((prev) => ({
                ...prev,
                latitude: lat,
                longitude: lng,
              }))
            }
          />
          <p>
            Coordenadas seleccionadas:{" "}
            <strong>
              {form.latitude.toFixed(5)}, {form.longitude.toFixed(5)}
            </strong>
          </p>
        </div>

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

        <label>Categorías</label>
        <div className="features-checkboxes">
          {categories.map((c) => (
            <div key={c.id} className="feature-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.id)}
                onChange={() => toggleCategory(c.id)}
              />
              <div className="feature-label">{c.title}</div>
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
