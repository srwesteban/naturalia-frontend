import React from 'react';
import '../../styles/components/home/CategoryFilter.css';

const CategoryFilter = ({ categories = [], selected = [], onToggle = () => {}, onClear = () => {} }) => {
  return (
    <section className="category-filter-bar">
      <h2>Filtrar por categoria</h2>
      <div className="chips-container">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={selected.includes(cat.title) ? 'chip selected' : 'chip'}
            onClick={() => onToggle(cat.title)}
          >
            {cat.imageUrl && <img src={cat.imageUrl} alt={cat.title} className="chip-icon" />}
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <button className="clear-btn" onClick={onClear}>
          Limpiar filtros ✖
        </button>
      )}
    </section>
  );
};

export default CategoryFilter;
