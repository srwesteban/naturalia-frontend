import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStayById } from "../services/stayService";
import Gallery from "../components/Gallery";
import "../styles/pages/StayDetail.css";
import DateReservation from "../components/reservations/DateReservations";
import { getUserId } from "../services/authService";

const StayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const data = await getStayById(id);
        setStay(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStay();
  }, [id]);

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (e) {
        console.error("❌ No se pudo obtener el ID del usuario", e);
      }
    };

    loadUserId();
  }, []);

  if (!stay) return <p>Cargando...</p>;

  return (
    <div className="stay-detail">
      <header className="detail-header">
        <h2>{stay.name}</h2>
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </header>

      <section className="detail-body">
        <Gallery images={stay.images} />

        <p className="description">{stay.description}</p>
        <p><strong>Ubicación:</strong> {stay.location}</p>
        <p><strong>Capacidad:</strong> {stay.capacity} personas</p>
        <p><strong>Precio:</strong> ${stay.pricePerNight} / noche</p>

        {/* Solo renderiza la reserva si se tiene el userId */}
        {userId && <DateReservation stayId={stay.id} userId={userId} />}
      </section>
    </div>
  );
};

export default StayDetail;
