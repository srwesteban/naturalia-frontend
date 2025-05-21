import React, { useEffect, useState } from 'react';
import { getAllStays } from '../services/stayService';
import StayCard from './StayCard';
import '../styles/components/StayRecommendations.css';

const StayRecommendations = () => {
  const [stays, setStays] = useState([]);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getAllStays();
        const random = [...data].sort(() => 0.5 - Math.random()).slice(0, 10);
        setStays(random);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStays();
  }, []);

  return (
    <section className="recommendations">
      <h2>Recomendaciones</h2>
      <div className="stay-grid">
        {stays.map((stay) => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </div>
    </section>
  );
};

export default StayRecommendations;
