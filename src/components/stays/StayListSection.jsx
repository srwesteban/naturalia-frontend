import React, { useEffect, useState } from "react";
import { getAllStays } from "../../services/stayService";
import StayListCard from "./StayListCard";
import CategoryFilter from "../CategoryFilter";
import "../../styles/components/StayListSection.css";

const StayListSection = () => {
  const [allStays, setAllStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getAllStays();
        console.log(
          "✅ Stays fetched:",
          data.map((s) => ({
            id: s.id,
            name: s.name,
            type: s.type,
          }))
        );
        setAllStays(data);
        setFilteredStays(data);
      } catch (err) {
        console.error("❌ Error fetching stays:", err.message);
      }
    };

    fetchStays();
  }, []);

  useEffect(() => {
    const filtered =
      selectedCategories.length > 0
        ? allStays.filter((stay) => {
            const stayType =
              typeof stay.type === "string"
                ? stay.type.toUpperCase()
                : stay.type?.name?.toUpperCase?.() || "";
            const match = selectedCategories.includes(stayType);
            console.log(
              `🧪 stay: ${stay.name} | type: ${stayType} | match: ${match}`
            );
            return match;
          })
        : allStays;

    console.log(
      "📊 Filtered stays:",
      filtered.map((s) => s.name)
    );
    setFilteredStays(filtered);
    setCurrentPage(1);
  }, [selectedCategories, allStays]);

  const totalPages = Math.ceil(filteredStays.length / itemsPerPage);
  const paginated = filteredStays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryClick = (category) => {
    if (category === "ALL") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([category]); // ← reemplaza por esto
    }
  };

  return (
    <section className="stay-list-section">
      <h2>Alojamientos</h2>
      <CategoryFilter
        selected={selectedCategories}
        onCategoryClick={handleCategoryClick}
      />
      <p>{filteredStays.length} resultados encontrados</p>

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
