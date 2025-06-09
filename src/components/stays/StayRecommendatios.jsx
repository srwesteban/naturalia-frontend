import React, { useEffect, useState } from "react";
import { getRecommendedStays } from "../../services/stayService";
import StayCardMini from "./StayCardMini";
import "../../styles/components/stays/StayRecommendations.css";

const StayRecommendations = () => {
  const [stays, setStays] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecommendedStays();
        setStays(data);
      } catch (err) {
        console.error("Error loading recommendations:", err);
      }
    };
    fetchData();
  }, []);

  if (stays.length === 0) return null;

  return (
    <section className="stay-recommendations">
      <div className="stay-recommendations__header">
        <h3 className="stay-recommendations__title">
          🏅 Alojamientos Recomendados
        <button
          className="stay-recommendations__toggle-btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Ocultar" : "Ver"}
        </button>
        </h3>
      </div>

      {open && (
        <div className="stay-recommendations__scroll">
          {stays.slice(0, 5).map((stay) => (
            <StayCardMini key={stay.id} stay={stay} />
          ))}
        </div>
      )}
    </section>
  );
};

export default StayRecommendations;
