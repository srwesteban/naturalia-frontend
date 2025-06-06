import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { es } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../styles/components/search/SearchBar.css";
import { getSuggestions } from "../../services/stayService.js";

const SearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const checkIn = dateRange[0].startDate.toISOString().split("T")[0];
    const checkOut = dateRange[0].endDate.toISOString().split("T")[0];

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
              <li
                key={stay.id}
                onClick={() => handleSuggestionClick(stay.name)}
              >
                {stay.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className="search-dates"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        📅 {dateRange[0].startDate.toLocaleDateString()} -{" "}
        {dateRange[0].endDate.toLocaleDateString()}
      </div>

      <button className="btn-search" onClick={handleSearch} disabled={loading}>
        {loading ? <span className="spinner"></span> : "Buscar"}
      </button>

      {showCalendar && (
        <div className="calendar-wrapper">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            locale={es}
          />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
