import React from 'react';
import '../styles/components/CategoryFilter.css';

const categories = [
  { type: 'GLAMPING', label: '🏕 Glamping' },
  { type: 'COUNTRY_HOUSE', label: '🏡 Casa Campestre' },
];

const CategoryFilter = ({ selected = [], onCategoryClick = () => {} }) => {
  return (
    <section className="category-filter">
      <h3>Categorías:</h3>
      <div className="category-buttons">
        <button
          className={selected.length === 0 ? 'selected' : ''}
          onClick={() => onCategoryClick('ALL')}
        >
          🔍 Ver todo
        </button>
        {categories.map((cat) => (
          <button
            key={cat.type}
            className={selected.includes(cat.type) ? 'selected' : ''}
            onClick={() => onCategoryClick(cat.type)}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
