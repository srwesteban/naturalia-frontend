import React, { useState } from "react";
import "../../styles/components/modals/ShareModal.css";

const ShareModal = ({ onClose }) => {
  const currentUrl = window.location.href;
  const [customText, setCustomText] = useState("¡Mira este lugar increíble!");

  const encodedURL = encodeURIComponent(currentUrl);
  const encodedText = encodeURIComponent(customText);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        <h3>Compartir en redes</h3>

        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          placeholder="Escribe tu mensaje"
          style={{ width: "100%", height: "80px", marginBottom: "1rem" }}
        />

        <div className="share-options">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn facebook"
          >
            Facebook
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn twitter"
          >
            X (Twitter)
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn instagram"
          >
            Instagram (copia y pega)
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
