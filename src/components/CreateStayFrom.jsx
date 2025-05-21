import React, { useState } from 'react';
import '../styles/components/CreateStayForm.css';
import { uploadImageToCloudinary } from '../services/cloudinary';
import { createStay } from '../services/stayService';

const initialForm = {
  name: '',
  description: '',
  location: '',
  capacity: 1,
  pricePerNight: 0,
  type: 'GLAMPING',
  images: [],          // URLs que enviaremos al backend
};

const CreateStayForm = () => {
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState([]);         // archivos locales
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Maneja inputs de texto / número
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Maneja carga de archivos
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);     // múltiples imágenes
  };

  // Sube todos los archivos a Cloudinary y devuelve un array de URLs
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
    setErrorMsg('');
    setSuccessMsg('');

    try {
      // 1. Subir imágenes y obtener URLs públicas
      const imageUrls = await uploadAllImages();

      // 2. Armar payload
      const payload = { ...form, images: imageUrls };

      // 3. Enviar al backend
      await createStay(payload);

      setSuccessMsg('¡Alojamiento creado con éxito!');
      setForm(initialForm);
      setFiles([]);
    } catch (err) {
      setErrorMsg(err.message || 'Error al crear el alojamiento');
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
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="4"
        />

        <label>Ubicación</label>
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
        />

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

        <label>Imágenes (máx 4)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Subiendo…' : 'Agregar producto'}
        </button>
      </form>
    </section>
  );
};

export default CreateStayForm;
