import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../services/categoryService';
import AddCategoryForm from '../components/category/AddCategoryForm';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import '../styles/pages/AdminCategoryPage.css';

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

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

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setErrorMsg('');
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      loadCategories();
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  return (
    <div className="admin-category-page">
      <h2 className="page-title">Gestión de Categorías</h2>

      <section className="form-section">
        <AddCategoryForm onCategoryCreated={loadCategories} />
      </section>

      <section className="list-section">
        <h3 className="list-title">Categorías existentes</h3>

        <div className="category-table-wrapper">
          <table className="category-table">
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
                    <img src={cat.imageUrl} alt={cat.title} width={50} height={50} />
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDeleteClick(cat)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {categoryToDelete && (
        <ConfirmDeleteModal
          entityName={`categoría "${categoryToDelete.title}"`}
          title="¿Eliminar categoría?"
          warning="Esta categoría podría estar asociada a productos."
          error={errorMsg}
          onClose={() => {
            setCategoryToDelete(null);
            setErrorMsg('');
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AdminCategoryPage;
