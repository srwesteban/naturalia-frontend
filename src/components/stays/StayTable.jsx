import React from 'react';
import '../../styles/components/stays/StayTable.css';


const StayTable = ({ stays, onEdit, onDelete, onChangeType }) => {
  return (
    <table className="stay-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {stays.map((stay) => (
          <tr key={stay.id}>
            <td>{stay.name}</td>
            <td>
              <button onClick={() => onEdit(stay.id)}>✏️ Editar</button>
              <button onClick={() => onDelete(stay.id)}>🗑️ Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StayTable;
