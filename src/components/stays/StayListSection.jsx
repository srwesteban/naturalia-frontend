import React, { useEffect, useState } from "react";
import { getStayListCards, searchStaysLight } from "../../services/stayService";
import { getCategories } from "../../services/categoryService";
import StayListCard from "./StayListCard";
import CategoryFilter from "../../components/category/CategoryFilter";
import SearchBar from "../search/SearchBar";
import { getUserId } from "../../services/authService";
import "../../styles/components/stays/StayListSection.css";
import StayRecommendations from "./StayRecommendatios";

const StayListSection = () => {
  const [allStays, setAllStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);


  const totalPages = Math.ceil(filteredStays.length / itemsPerPage);
  const paginatedStays = filteredStays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: -10, behavior: "smooth" });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: -10, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stays, cats] = await Promise.all([
          getStayListCards(),
          getCategories(),
        ]);

        setAllStays(stays);
        setFilteredStays(stays);
        setCategories(cats);
      } catch (err) {
        console.error("❌ Error al cargar datos:", err.message);
      }
    };

    const fetchUser = async () => {
      try {
        const id = await getUserId();
        if (id) setUserId(id);
      } catch {
        setUserId(null);
      }
    };

    fetchData();
    fetchUser();
  }, []);

  const handleSearch = async (checkIn, checkOut, name) => {
    try {
      let filtered = await searchStaysLight(checkIn, checkOut);

      if (name && name.trim().length > 0) {
        const nameLower = name.toLowerCase();
        filtered = filtered.filter((stay) =>
          stay.name.toLowerCase().includes(nameLower)
        );
      }

      setFilteredStays(filtered);
      setCurrentPage(1);
    } catch (err) {
      console.error("❌ Error al buscar:", err.message);
    }
  };

  const handleToggleCategory = (title) => {
    const updated = selectedCategories.includes(title)
      ? selectedCategories.filter((cat) => cat !== title)
      : [...selectedCategories, title];

    setSelectedCategories(updated);

    if (updated.length === 0) {
      setFilteredStays(allStays);
      setCurrentPage(1);
      return;
    }

    const filtered = allStays.filter((stay) => {
      const match = stay.categories?.some((cat) =>
        updated.includes(cat.title || cat.name)
      );
      return match;
    });

    setFilteredStays(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setFilteredStays(allStays);
    setCurrentPage(1);
  };

  return (
    <div className="stay-list-section">
      {isLoading && (
        <p className="loading-text">🔍 Buscando alojamientos disponibles...</p>
      )}
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter
        categories={categories}
        selected={selectedCategories}
        onToggle={handleToggleCategory}
        onClear={clearFilters}
      />
      <StayRecommendations />

      <div className="stay-list-grid">
        {paginatedStays.map((stay) => (
          <StayListCard key={stay.id} stay={stay} userId={userId} />
        ))}
      </div>

      {filteredStays.length > itemsPerPage && (
        <div className="pagination-controls">
          <button onClick={goToPrevPage} disabled={currentPage === 1}>
            ← Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

export default StayListSection;
