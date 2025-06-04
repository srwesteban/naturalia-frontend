import React, { useEffect, useState } from "react";
import "../../styles/components/modals/EditStayModal.css";
import { uploadImageToCloudinary } from "../../services/cloudinary";

const EditStayModal = ({ stayId, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    location: initialData?.location || "",
    capacity: initialData?.capacity || 0,
    pricePerNight: initialData?.pricePerNight || 0,
    type: initialData?.type || "GLAMPING",
    images: initialData?.images || [],
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    e.target.value = null; // reset input
    if (!file) return;
    if (formData.images.length >= 5) {
      setError("No se pueden cargar más de 5 imágenes.");
      return;
    }
    setError("");
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      setError("Error al subir la imagen. Intenta de nuevo.");
    }
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
    setError("");
  };

  const handleSubmit = () => {
    onSave(stayId, formData);
    onClose();
  };

  return (
    <div className="edit-stay-modal">
      <div className="modal-content">
        <h3>Editar Producto</h3>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Ubicación"
        />

        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          placeholder="Capacidad"
        />

        <input
          type="number"
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleChange}
          placeholder="Precio por noche"
        />

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="GLAMPING">Glamping</option>
          <option value="COUNTRY_HOUSE">Casa Campestre</option>
        </select>

        <h4>Imágenes</h4>
        <div className="image-list">
          {formData.images.map((img, index) => (
            <div className="image-item" key={index}>
              <img
                src={img}
                alt={`img-${index}`}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/60?text=No+Img";
                }}
              />
              <button
                type="button"
                className="remove-btn"
                onClick={() => removeImage(index)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          className="file-input"
          onChange={handleUpload}
        />
        {error && <p className="error-msg">{error}</p>}

        <div className="modal-actions">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" onClick={handleSubmit}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStayModal;
