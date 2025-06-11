import React, { useEffect, useState } from "react";
import "../../styles/components/modals/EditStayModal.css";
import { uploadImageToCloudinary } from "../../services/cloudinary";
import { getFeatures } from "../../services/featureService";
import { getCategories } from "../../services/categoryService";
import { toast } from "react-toastify";

const EditStayModal = ({ stayId, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    capacity: 1,
    pricePerNight: 0,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    latitude: 0,
    longitude: 0,
    images: [],
    features: [],
    categories: [],
  });
  const [error, setError] = useState("");
  const [features, setFeatures] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setFormData({
      ...initialData,
      features: initialData.features.map((f) => f.id),
      categories: initialData.categories.map((c) => c.id),
    });
  }, [initialData]);

  useEffect(() => {
    getFeatures().then(setFeatures);
    getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSelection = (id, type) => {
    setFormData((prev) => {
      const current = prev[type];
      return {
        ...prev,
        [type]: current.includes(id)
          ? current.filter((i) => i !== id)
          : [...current, id],
      };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (formData.images.length >= 5) {
      setError("No se pueden cargar más de 5 imágenes.");
      return;
    }
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    } catch (err) {
      console.error(err);
      setError("Error al subir la imagen.");
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        featureIds: formData.features,
        categoryIds: formData.categories,
        hostId: formData.host?.id || null,
      };

      await onSave(stayId, payload);
      toast.success("Alojamiento actualizado con éxito 🎉");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Hubo un error al guardar los cambios.");
    }
  };

  return (
    <div className="edit-stay-modal">
      <div className="modal-content">
        <h3>Editar Alojamiento</h3>

        <div className="form-group">
          <label>Nombre</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ubicación</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Capacidad</label>
            <input
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Precio por noche</label>
            <input
              name="pricePerNight"
              type="number"
              value={formData.pricePerNight}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Habitaciones</label>
            <input
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Camas</label>
            <input
              name="beds"
              type="number"
              value={formData.beds}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Baños</label>
            <input
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Latitud</label>
            <input
              name="latitude"
              type="number"
              value={formData.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Longitud</label>
            <input
              name="longitude"
              type="number"
              value={formData.longitude}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Características</label>
        <div className="form-group">
          <div className="checkbox-group">
            {features.map((f) => (
              <label key={f.id}>
                <input
                  type="checkbox"
                  checked={formData.features.includes(f.id)}
                  onChange={() => toggleSelection(f.id, "features")}
                />
                {f.name}
              </label>
            ))}
          </div>
        </div>

        <label>Categorías</label>
        <div className="form-group">
          <div className="checkbox-group">
            {categories.map((c) => (
              <label key={c.id}>
                <input
                  type="checkbox"
                  checked={formData.categories.includes(c.id)}
                  onChange={() => toggleSelection(c.id, "categories")}
                />
                {c.title}
              </label>
            ))}
          </div>
        </div>

        <label>Imágenes (máx. 5)</label>
        <div className="form-group">
          <div className="image-list">
            {formData.images.map((img, index) => (
              <div className="image-item" key={index}>
                <img src={img} alt={`img-${index}`} />
                <button
                  className="remove-btn"
                  onClick={() => removeImage(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
          <input
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="modal-actions">
          <button onClick={onClose}>Cancelar</button>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditStayModal;
