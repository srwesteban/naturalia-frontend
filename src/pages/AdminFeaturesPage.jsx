import React, { useEffect, useState } from 'react';
import { getFeatures, createFeature, updateFeature, deleteFeature } from '../services/featureService';
import FeatureForm from '../components/features/FeatureForm';
import FeatureCard from '../components/features/FeatureCard';

const AdminFeaturesPage = () => {
  const [features, setFeatures] = useState([]);
  const [editingFeature, setEditingFeature] = useState(null);

  const loadFeatures = async () => {
    try {
      const data = await getFeatures();
      setFeatures(data);
    } catch (error) {
      console.error('Error loading features:', error);
    }
  };

  useEffect(() => {
    loadFeatures();
  }, []);

  const handleCreate = async (featureData) => {
    await createFeature(featureData);
    loadFeatures();
  };

  const handleUpdate = async (id, featureData) => {
    await updateFeature(id, featureData);
    setEditingFeature(null);
    loadFeatures();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta característica?')) {
      await deleteFeature(id);
      loadFeatures();
    }
  };

  return (
    <div className="admin-features">
      <h2>Administrar características</h2>
      <FeatureForm
        onSubmit={editingFeature ? (data) => handleUpdate(editingFeature.id, data) : handleCreate}
        initialData={editingFeature}
        onCancel={() => setEditingFeature(null)}
      />
      <div className="feature-list">
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            onEdit={() => setEditingFeature(feature)}
            onDelete={() => handleDelete(feature.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminFeaturesPage;
