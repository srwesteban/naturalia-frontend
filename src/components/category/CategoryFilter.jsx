import React, { useState } from "react";
import "../../styles/components/home/CategoryFilter.css";

const CategoryFilter = ({
  categories = [],
  selected = [],
  onToggle = () => {},
  onClear = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="category-filter-bar">
      <div className="mobile-toggle">
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "Ocultar categorias ▲" : "Mostrar categorias ▼"}
        </button>
      </div>

      <div className={`chips-container ${isOpen ? "show" : ""}`}>
        <div className="category-title">
          <h2>Filtrar por categoria:</h2>
        </div>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={selected.includes(cat.title) ? "chip selected" : "chip"}
            onClick={() => onToggle(cat.title)}
          >
            {cat.imageUrl ? (
              <img
                src={cat.imageUrl}
                alt={cat.title}
                className="chip-icon"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/icons/default-category.svg";
                }}
              />
            ) : (
              <img
                src="/icons/default-category.svg"
                alt="Icono por defecto"
                className="chip-icon"
              />
            )}
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
