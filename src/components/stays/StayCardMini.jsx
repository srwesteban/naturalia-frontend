import React from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/components/stays/StayCardMini.css";

const StayCardMini = ({ stay }) => {
  const navigate = useNavigate();

  return (
    <div
      className="stay-card-mini"
      onClick={() => navigate(`/stays/${stay.id}`)}
    >
      <div className="stay-card-mini__image-wrapper">
        <img
          src={stay.images[0]}
          alt={stay.name}
          className="stay-card-mini__image"
        />
        <div className="stay-card-mini__rating">
          ⭐ {stay.averageRating.toFixed(1)}
        </div>
      </div>
      <div className="stay-card-mini__info">
        <h3 className="stay-card-mini__title">{stay.name}</h3>
      </div>
    </div>
  );
};

export default StayCardMini;
