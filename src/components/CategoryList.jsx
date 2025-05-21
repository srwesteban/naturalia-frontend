import React from 'react';
import '../styles/Home.css';

const CategoryList = () => {
  return (
    <section className="categories">
      <h2>Categorías</h2>
      <div className="category-list">
        <button>🏕 Glamping</button>
        <button>🏡 Casa Campestre</button>
      </div>
    </section>
  );
};

export default CategoryList;
