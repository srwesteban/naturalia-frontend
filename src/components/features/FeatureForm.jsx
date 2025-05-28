import React, { useState, useEffect } from 'react';

const FeatureForm = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIcon(initialData.icon);
    } else {
      setName('');
      setIcon('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !icon.trim()) return;
    onSubmit({ name, icon });
    setName('');
    setIcon('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>{initialData ? 'Editar característica' : 'Añadir nueva característica'}</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ícono (ej: fa-tree)"
        value={icon}
        onChange={(e) => setIcon(e.target.value)}
        required
      />
      <button type="submit">{initialData ? 'Actualizar' : 'Añadir'}</button>
      {initialData && <button type="button" onClick={onCancel}>Cancelar</button>}
    </form>
  );
};

export default FeatureForm;
