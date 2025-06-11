// src/components/reviews/ReviewSection.jsx
import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import ReviewForm from "./ReviewForm";
import {
  getReviewsByStayId,
  getAverageRating,
} from "../../services/reviewService";
import "../../styles/components/reviews/ReviewSection.css";

const ReviewSection = ({ stayId }) => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchReviews = async () => {
    try {
      const data = await getReviewsByStayId(stayId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const fetchAverage = async () => {
    try {
      const avg = await getAverageRating(stayId);
      setAverage(avg);
    } catch (error) {
      console.error("Error fetching average rating:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchAverage();
  }, [stayId]);

  const handleReviewSubmit = () => {
    fetchReviews();
    fetchAverage();
  };

  return (
    <div className="review-section">
      <h3>Puntaje</h3>
      <div className="average-rating">
        <StarRating rating={average} readOnly />
        <span>{average.toFixed(1)} / 5</span>
        <span>({reviews.length} reseñas)</span>
      </div>

      <ReviewForm stayId={stayId} onReviewSubmit={handleReviewSubmit} />
      <h1>Reseñas</h1>

      {reviews.length === 0 ? (
        <p className="no-reviews">
          Todavía no hay reseñas para este alojamiento.
        </p>
      ) : (
        <div className="review-list">
          {reviews.map((r, i) => (
            <div key={i} className="review-item">
              <div className="review-header">
                <strong>{r.userName}</strong>
                <span>{new Date(r.date).toLocaleDateString()}</span>
              </div>
              <StarRating rating={r.rating} readOnly={true} />
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
