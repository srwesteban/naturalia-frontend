import React from 'react';
import '../../styles/components/stays/StayCard.css';
import { useNavigate } from 'react-router-dom';

const StayCard = ({ stay }) => {
  const navigate = useNavigate();

  return (
    <div className="stay-card" onClick={() => navigate(`/stays/${stay.id}`)}>
      <img src={stay.images[0]} alt={stay.name} className="stay-image" />
      <div className="stay-info">
        <div className="text-block">
          <h3>{stay.name}</h3>
          <p>{stay.location}</p>
          <p className="stay-description">
            {stay.description?.slice(0, 40) || '...'}...
          </p>
        </div>
        <div className="price-block">
          <span className="price">${stay.pricePerNight} / noche</span>
        </div>
      </div>
    </div>
  );
};

export default StayCard;
