import React, { useEffect, useState } from 'react';
import {
  getFeatures,
  createFeature,
  updateFeature,
  deleteFeature
} from '../services/featureService';
import FeatureForm from '../components/features/FeatureForm';
import FeatureCard from '../components/features/FeatureCard';
import ConfirmDeleteModal from '../components/modals/ConfirmDeleteModal';
import { toast } from 'react-toastify';
import '../styles/pages/AdminFeaturesPage.css';

const AdminFeaturesPage = () => {
  const [features, setFeatures] = useState([]);
  const [editingFeature, setEditingFeature] = useState(null);
  const [featureToDelete, setFeatureToDelete] = useState(null);

  const loadFeatures = async () => {
    try {
      const data = await getFeatures();
      setFeatures(data);
    } catch (error) {
      toast.error('Error al cargar las características');
      console.error('Error loading features:', error);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const handleCreate = async (featureData) => {
    try {
      await createFeature(featureData);
      toast.success('✅ Característica creada correctamente');
      loadFeatures();
    } catch (err) {
      toast.error('❌ Error al crear la característica');
    }
  };

  const handleUpdate = async (id, featureData) => {
    try {
      await updateFeature(id, featureData);
      toast.success('✏️ Característica actualizada');
      setEditingFeature(null);
      loadFeatures();
    } catch (err) {
      toast.error('❌ Error al actualizar la característica');
    }
  };

  const handleDelete = (id) => {
    const feature = features.find((f) => f.id === id);
    setFeatureToDelete(feature);
  };

  const confirmDelete = async () => {
    try {
      await deleteFeature(featureToDelete.id);
      toast.success('🗑️ Característica eliminada');
      loadFeatures();
    } catch (err) {
      toast.error('❌ Error al eliminar la característica');
    } finally {
      setFeatureToDelete(null);
    }
  };

  return (
    <div className="admin-features-container">
      <h2 className="admin-title">Administrar Características</h2>

      <div className="form-section">
        <FeatureForm
          onSubmit={
            editingFeature
              ? (data) => handleUpdate(editingFeature.id, data)
              : handleCreate
          }
          initialData={editingFeature}
          onCancel={() => setEditingFeature(null)}
        />
      </div>

      <div className="feature-list-admin">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onEdit={() => setEditingFeature(feature)}
            onDelete={() => handleDelete(feature.id)}
          />
        ))}
      </div>

      {featureToDelete && (
        <ConfirmDeleteModal
          entityName={featureToDelete.name}
          title="¿Eliminar característica?"
          onClose={() => setFeatureToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminFeaturesPage;
