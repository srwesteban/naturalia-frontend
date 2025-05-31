import React, { useEffect, useState } from "react";
import { getAllStays } from "../../services/stayService";
import { getCategories } from "../../services/categoryService";
import StayListCard from "./StayListCard";
import CategoryFilter from "../category/CategoryFilter";
import "../../styles/components/stays/StayListSection.css";

const StayListSection = () => {
  const [allStays, setAllStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getAllStays();
        setAllStays(data);
        setFilteredStays(data);
      } catch (err) {
        console.error("❌ Error fetching stays:", err.message);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setAllCategories(data);
      } catch (err) {
        console.error("❌ Error fetching categories:", err.message);
      }
    };

    fetchStays();
    fetchCategories();
  }, []);

  useEffect(() => {
    const filtered = selectedCategories.length > 0
      ? allStays.filter((stay) =>
          stay.categories?.some((cat) =>
            selectedCategories.includes(cat.title || cat)
          )
        )
      : allStays;

    setFilteredStays(filtered);
    setCurrentPage(1);
  }, [selectedCategories, allStays]);

  const totalPages = Math.ceil(filteredStays.length / itemsPerPage);
  const paginated = filteredStays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryClick = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
  };

  return (
    <section className="stay-list-section">
      <h2>Alojamientos</h2>

      <CategoryFilter
        categories={allCategories}
        selected={selectedCategories}
        onToggle={handleCategoryClick}
        onClear={handleClearFilters}
      />

      <p>
        Mostrando {filteredStays.length} de {allStays.length} resultados
      </p>

      <div className="stay-list-grid">
        {paginated.map((stay) => (
          <StayListCard key={stay.id} stay={stay} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          ⏮ Inicio
        </button>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          ◀ Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente ▶
        </button>
      </div>
    </section>
  );
};

export default StayListSection;
