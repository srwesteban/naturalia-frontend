import React from 'react';
import '../styles/components/StayListCard.css';
import { useNavigate } from 'react-router-dom';

const StayListCard = ({ stay }) => {
  const navigate = useNavigate();

  return (
    <div className="stay-list-card" onClick={() => navigate(`/stays/${stay.id}`)}>
      <img src={stay.images[0]} alt={stay.name} />
      <div className="stay-info">
        <h3>{stay.name}</h3>
        <p>{stay.location}</p>
        <p>{stay.description?.slice(0, 100)}...</p>
        <span>${stay.pricePerNight} / noche</span>
      </div>
    </div>
  );
};

export default StayListCard;
