import React from 'react';
import '../../styles/components/stays/StayListCard.css';
import { useNavigate } from 'react-router-dom';

const StayListCard = ({ stay }) => {
  const navigate = useNavigate();

  return (
    <div className="stay-list-card" onClick={() => navigate(`/stays/${stay.id}`)}>
      <img src={stay.images[0]} alt={stay.name} />
      <div className="stay-info">
        <div className="text-block">
          <h3>{stay.name}</h3>
          <p>{stay.location}</p>
          <p className="stay-description">{stay.description?.slice(0, 100)}...</p>
        </div>
        <div className="price-block">
          <span className="price">${stay.pricePerNight} / noche</span>
        </div>
      </div>
    </div>
  );
};

export default StayListCard;
