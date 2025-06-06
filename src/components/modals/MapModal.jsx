import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import "../../styles/components/modals/MapModal.css";

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationSelector = ({ setLocation, closeModal }) => {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      closeModal();
    },
  });
  return null;
};

// 🔥 Componente interno para forzar invalidateSize()
const ResizeFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200); // espera a que el modal termine de animarse
  }, [map]);
  return null;
};

const MapModal = ({ isOpen, onClose, onSelect }) => {
  const [mounted, setMounted] = useState(false);
  const center = [4.60971, -74.08175]; // Bogotá

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      setMounted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="map-modal-overlay">
      <div className="map-modal">
        <button className="close-btn" onClick={onClose}>✕</button>
        <p className="map-instructions">Haz clic en el mapa para seleccionar una ubicación</p>

        {mounted && (
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <ResizeFix /> {/* 💥 Esto arregla todo */}
            <LocationSelector setLocation={onSelect} closeModal={onClose} />
            <Marker position={center} icon={markerIcon} />
          </MapContainer>
        )}
      </div>
    </div>,
    document.body
  );
};

export default MapModal;
