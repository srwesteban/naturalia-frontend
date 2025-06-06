import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

const LocationPickerMap = ({ latitude, longitude, onChange }) => {
  const position = [latitude || 4.60971, longitude || -74.08175]; // Bogotá por defecto

  const MarkerSetter = () => {
    useMapEvents({
      click(e) {
        onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return <Marker position={position} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />;
  };

  return (
    <MapContainer center={position} zoom={12} style={{ height: "300px", marginBottom: "1rem" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerSetter />
    </MapContainer>
  );
};

export default LocationPickerMap;
