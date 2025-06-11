import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import "../../styles/components/search/SearchBar.css";
import { getSuggestions } from "../../services/stayService";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSearch = async () => {
    setLoading(true);
    const checkIn = startDate?.toISOString().split("T")[0];
    const checkOut = endDate?.toISOString().split("T")[0];
    try {
      await onSearch(checkIn, checkOut, searchText);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value.trim().length >= 2) {
      try {
        const results = await getSuggestions(value);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error obteniendo sugerencias:", err);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchText(name);
    setSuggestions([]);
    setShowSuggestions(false);
    handleSearch();
  };

  return (
    <div className="search-bar-modern">
      <div className="search-input-group">
        <input
          type="text"
          placeholder="¿A dónde vas?"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestion-list">
            {suggestions.map((stay) => (
              <li key={stay.id} onClick={() => handleSuggestionClick(stay.name)}>
                {stay.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-dates">
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={([start, end]) => {
            setStartDate(start);
            setEndDate(end);
          }}
          locale={es}
          dateFormat="dd/MM/yyyy"
          placeholderText="Selecciona fechas"
          className="datepicker-input"
          popperPlacement="bottom"
        />
      </div>

      <button className="btn-search" onClick={handleSearch} disabled={loading}>
        {loading ? <span className="spinner"></span> : "Buscar"}
      </button>
    </div>
  );
};

export default SearchBar;
