// src/components/reviews/StarRating.jsx
import React from 'react';
import '../../styles/components/reviews/StarRating.css';

const StarRating = ({ rating = 0, onChange, readOnly = false }) => {
  const handleClick = (value) => {
    if (!readOnly && onChange) onChange(value);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? 'filled' : ''}`}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
