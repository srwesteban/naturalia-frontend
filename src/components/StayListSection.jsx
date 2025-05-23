import React, { useEffect, useState } from 'react';
import { getAllStays } from '../services/stayService';
import StayListCard from './StayListCard';
import '../styles/components/StayListSection.css';

const StayListSection = () => {
  const [stays, setStays] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getAllStays();
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setStays(shuffled);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStays();
  }, []);

  const totalPages = Math.ceil(stays.length / itemsPerPage);
  const paginated = stays.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section className="stay-list-section">
      <h2>Alojamientos</h2>

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
        <span>Página {currentPage} de {totalPages}</span>
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
