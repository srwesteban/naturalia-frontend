import React, { useEffect, useState } from 'react';
import { getAllStays } from '../services/stayService';
import StayCard from './stays/StayCard';
import '../styles/components/stays/StayRecommendations.css';

const StayRecommendations = () => {
  const [stays, setStays] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(true); // toggle

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getAllStays();
        const random = [...data].sort(() => 0.5 - Math.random()).slice(0, 4);
        setStays(random);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStays();
  }, []);

  return (
    <section className="recommendations">
      <h2
        className="recommendations-title"
        onClick={() => setShowRecommendations(!showRecommendations)}
      >
        Recomendaciones
        <span className={`arrow ${showRecommendations ? 'close' : ''}`}>&gt;</span>
      </h2>

      {showRecommendations && (
        <div className="stay-grid">
          {stays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      )}
    </section>
  );
};

export default StayRecommendations;
