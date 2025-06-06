import React, { useState } from "react";

const LocationManualInput = ({ value, onChange }) => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");

  const updateLocation = (newCountry, newRegion, newCity) => {
    const full = `${newCountry}, ${newRegion}, ${newCity}`;
    onChange(full);
  };

  return (
    <div className="inline">
      <input
        type="text"
        placeholder="País"
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          updateLocation(e.target.value, region, city);
        }}
      />
      <input
        type="text"
        placeholder="Región"
        value={region}
        onChange={(e) => {
          setRegion(e.target.value);
          updateLocation(country, e.target.value, city);
        }}
      />
      <input
        type="text"
        placeholder="Ciudad"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          updateLocation(country, region, e.target.value);
        }}
      />
    </div>
  );
};

export default LocationManualInput;
