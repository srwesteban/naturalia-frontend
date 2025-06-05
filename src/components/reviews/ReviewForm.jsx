// src/components/reviews/ReviewForm.jsx
import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { postReview } from '../../services/reviewService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/components/reviews/ReviewForm.css';

const ReviewForm = ({ stayId, onReviewSubmit }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (rating === 0 || comment.trim() === '') {
      setError('Debes escribir un comentario y dar una puntuación.');
      return;
    }

    try {
      await postReview({ stayId, rating, comment });
      setComment('');
      setRating(0);
      setSuccess('Gracias por tu reseña.');
      onReviewSubmit();
    } catch (err) {
      setError('No se pudo enviar la reseña.');
    }
  };

  if (!user) return null;

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h4>Escribe tu opinión</h4>
      <StarRating rating={rating} onChange={setRating} />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comparte tu experiencia..."
      />
      <button type="submit">Publicar reseña</button>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

export default ReviewForm;