import React from 'react';
import '../styles/Home.css';

const SearchBar = () => {
  return (
    <section className="search-section">
      <input
        type="text"
        className="search-input"
        placeholder="¿A dónde quieres escapar?"
      />
    </section>
  );
};

export default SearchBar;
