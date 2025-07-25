import React, { useState } from 'react';
import { createCategory } from '../../services/categoryService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/components/category/AddCategoryForm.css';

const AddCategoryForm = ({ onCategoryCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ title, description, imageUrl });
      toast.success('✅ Categoría creada exitosamente');
      setTitle('');
      setDescription('');
      setImageUrl('');
      if (onCategoryCreated) onCategoryCreated();
    } catch (err) {
      toast.error('❌ Error al crear la categoría');
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
    </form>
  );
};

export default AddCategoryForm;
