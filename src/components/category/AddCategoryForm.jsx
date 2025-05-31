import React, { useState } from 'react';
import { createCategory } from '../../services/categoryService';

const AddCategoryForm = ({ onCategoryCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ title, description, imageUrl });
      setMessage('Categoría creada exitosamente');
      setTitle('');
      setDescription('');
      setImageUrl('');
      if (onCategoryCreated) onCategoryCreated(); // <-- refrescar lista
    } catch (err) {
      setMessage('Error al crear la categoría');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-category-form">
      <h3>Agregar nueva categoría</h3>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="URL de la imagen"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <button type="submit">Crear categoría</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddCategoryForm;
