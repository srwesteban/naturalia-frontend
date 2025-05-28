import React from 'react';
import '../../styles/components/StayCard.css';
import { useNavigate } from 'react-router-dom';

const StayCard = ({ stay }) => {
  const navigate = useNavigate();

  return (
    <div className="stay-card" onClick={() => navigate(`/stays/${stay.id}`)} style={{ cursor: 'pointer' }}>
      <img src={stay.images[0]} alt={stay.name} className="stay-image" />
      <div className="stay-info">
        <h3>{stay.name}</h3>
        <p>{stay.location}</p>
        <span>${stay.pricePerNight} / noche</span>
      </div>
    </div>
  );
};


export default StayCard;
