import React, { useEffect, useState } from "react";
import { getAllStays, searchStaysByDate } from "../../services/stayService";
import StayListCard from "./StayListCard";
import CategoryFilter from "../../components/category/CategoryFilter";
import SearchBar from "../search/SearchBar";
import { getUserId } from "../../services/authService";
import "../../styles/components/stays/StayListSection.css";

const StayListSection = () => {
  const [allStays, setAllStays] = useState([]);
  const [filteredStays, setFilteredStays] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getAllStays();
        setAllStays(data);
        setFilteredStays(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    const fetchUser = async () => {
      try {
        const id = await getUserId();
        if (id) setUserId(id);
      } catch (err) {
        console.warn("Usuario no autenticado");
        setUserId(null);
      }
    };

    fetchStays();
    fetchUser();
  }, []);

  const handleSearch = async (checkIn, checkOut, name) => {
    try {
      let filtered = await searchStaysByDate(checkIn, checkOut);

      if (name && name.trim().length > 0) {
        const nameLower = name.toLowerCase();
        filtered = filtered.filter((stay) =>
          stay.name.toLowerCase().includes(nameLower)
        );
      }

      setFilteredStays(filtered);
    } catch (err) {
      console.error("Error al buscar alojamientos:", err.message);
    }
  };

  return (
    <div className="stay-list-section">
      {isLoading && (
        <p className="loading-text">🔍 Buscando alojamientos disponibles...</p>
      )}
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter />
      <div className="stay-list-grid">
        {filteredStays.map((stay) => (
          <StayListCard key={stay.id} stay={stay} userId={userId} />
        ))}
      </div>
    </div>
  );
};

export default StayListSection;
