import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../services/categoryService';
import AddCategoryForm from '../components/category/AddCategoryForm';
import '../styles/pages/AdminCategoryPage.css';

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría?')) return;
    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      alert('Error al eliminar la categoría');
    }
  };

  return (
    <div className="admin-category-page">
      <h2>Gestión de Categorías</h2>
      <AddCategoryForm onCategoryCreated={loadCategories} />
      <hr />
      <h3>Categorías existentes</h3>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.title}</td>
              <td>{cat.description}</td>
              <td>
                <img src={cat.imageUrl} alt={cat.title} width={50} />
              </td>
              <td>
                <button onClick={() => handleDelete(cat.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryPage;
