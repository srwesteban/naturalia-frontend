import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <main className="home">
      <section className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="¿A dónde quieres escapar?"
        />
      </section>

      <section className="categories">
        <h2>Categorías</h2>
        <div className="category-list">
          <button>🏕 Glamping</button>
          <button>🏡 Casa Campestre</button>
        </div>
      </section>

      <section className="recommendations">
        <h2>Recomendaciones</h2>
        <div className="recommendation-grid">
          {/* Aquí irán cards de stays */}
          <div className="card-placeholder">Stay #1</div>
          <div className="card-placeholder">Stay #2</div>
        </div>
      </section>
    </main>
  );
};

export default Home;
