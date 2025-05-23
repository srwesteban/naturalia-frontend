import React from 'react';
import '../styles/components/StayTable.css';

const StayTable = ({ stays, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="stay-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stays.map((stay) => (
            <tr key={stay.id}>
              <td>{stay.id}</td>
              <td>{stay.name}</td>
              <td className="actions">
                <button onClick={() => onEdit(stay.id)}>✏️</button>
                <button onClick={() => onDelete(stay.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StayTable;
