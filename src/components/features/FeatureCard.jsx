import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faEdit, faTrash);

const FeatureCard = ({ feature, onEdit, onDelete }) => {
  return (
    <div className="feature-card" style={styles.card}>
      <div style={styles.info}>
        <i className={`fa ${feature.icon}`} style={styles.icon}></i>
        <span>{feature.name}</span>
      </div>
      <div>
        <button onClick={onEdit} style={styles.button}>
          <FontAwesomeIcon icon="edit" />
        </button>
        <button onClick={onDelete} style={styles.button}>
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '0.5rem',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  icon: {
    fontSize: '1.2rem',
  },
  button: {
    marginLeft: '0.5rem',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    background: 'black',
  },
};

export default FeatureCard;
