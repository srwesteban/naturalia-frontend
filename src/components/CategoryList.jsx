import React from 'react';
import '../styles/pages/Home.css';

const CategoryList = () => {
  return (
    <section className="categories">
      <div className="category-list">
        <h2>Categorías:</h2>
        <button>🏕 Glamping</button>
        <button>🏡 Casa Campestre</button>
      </div>
    </section>
  );
};

export default CategoryList;
