import React, { useState } from 'react';
import '../../styles/components/stays/Gallery.css'
import ImageSliderModal from '../modals/ImageSliderModal';

const Gallery = ({ images = [] }) => {
  const [showSlider, setShowSlider] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const main = images[0];
  const others = images.slice(1, 5); // máx 4 adicionales

  const openSlider = (index = 0) => {
    setCurrentIndex(index);
    setShowSlider(true);
  };

  const closeSlider = () => setShowSlider(false);
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="gallery-container">
      <div className="main-image" onClick={() => openSlider(0)}>
        <img src={main} alt="Main" />
      </div>
      <div className="side-grid">
        {others.map((img, i) => (
          <div key={i} className="grid-img" onClick={() => openSlider(i + 1)}>
            <img src={img} alt={`Stay ${i + 2}`} />
          </div>
        ))}
      </div>
      <button className="view-more" onClick={() => openSlider(0)}>Ver más</button>

      {showSlider && (
        <ImageSliderModal
          images={images}
          currentIndex={currentIndex}
          onClose={closeSlider}
          onNext={next}
          onPrev={prev}
        />
      )}
    </div>
  );
};

export default Gallery;
