import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStayById } from "../services/stayService";
import Gallery from "../components/stays/Gallery";
import "../styles/pages/StayDetail.css";
import DateReservation from "../components/reservations/DateReservations";
import { getUserId } from "../services/authService";
import ShareModal from "../components/modals/ShareModal";
import { useAuth } from "../context/AuthContext";
import ReviewSection from "../components/reviews/ReviewSection";

const StayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();

  const [stay, setStay] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showShare, setShowShare] = useState(false);

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
      if (!user) return;
      try {
        const id = await getUserId();
        setUserId(id);
      } catch (e) {
        console.error("❌ No se pudo obtener el ID del usuario", e);
      }
    };
    loadUserId();
  }, [user]);

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
        <p>
          <strong>Ubicación:</strong> {stay.location}
        </p>
        <p>
          <strong>Capacidad:</strong> {stay.capacity} personas
        </p>
        <p>
          <strong>Precio:</strong> ${stay.pricePerNight} / noche
        </p>

        {!userId && (
          <p className="login-message">
            <strong>⚠ Debes iniciar sesión para hacer una reserva.</strong>
          </p>
        )}

        {userId && <DateReservation stayId={stay.id} userId={userId} />}
      </section>

      <button className="btn-share" onClick={() => setShowShare(true)}>
        Compartir
      </button>

      {showShare && (
        <ShareModal stay={stay} onClose={() => setShowShare(false)} />
      )}

      {/* ⭐ Sección de reseñas visible para todos */}
      {stay && (
        <ReviewSection stayId={stay.id} />
      )}
    </div>
  );
};

export default StayDetail;
