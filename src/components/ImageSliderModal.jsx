import React from 'react';
import '../styles/components/ImageSliderModal.css';

const ImageSliderModal = ({ images, currentIndex, onClose, onNext, onPrev }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="slider-overlay">
      <button className="close-btn" onClick={onClose}>✕</button>

      <div className="slider-content">
        <button className="nav-btn left" onClick={onPrev}>‹</button>

        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="slider-img"
        />

        <button className="nav-btn right" onClick={onNext}>›</button>
      </div>
    </div>
  );
};

export default ImageSliderModal;
