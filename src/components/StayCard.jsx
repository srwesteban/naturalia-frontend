import React from 'react';
import '../styles/components/StayCard.css';

const StayCard = ({ stay }) => {
  return (
    <div className="stay-card">
      <img
        src={stay.images[0] || 'https://via.placeholder.com/300x200'}
        alt={stay.name}
        className="stay-image"
      />
      <div className="stay-info">
        <h3>{stay.name}</h3>
        <p>{stay.location}</p>
        <span>${stay.pricePerNight} / noche</span>
      </div>
    </div>
  );
};

export default StayCard;
