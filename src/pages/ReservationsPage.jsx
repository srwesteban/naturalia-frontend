// src/pages/ReservationsPage.jsx
import React, { useEffect, useState } from "react";
import {
  getMyReservations,
  deleteReservation,
  cancelReservation,
} from "../services/reservationService";
import "../styles/pages/ReservationsPage.css";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);

  const loadReservations = async () => {
    try {
      const data = await getMyReservations();
      setReservations(data);
    } catch (err) {
      console.error("Error cargando reservas:", err);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleCancel = async (id) => {
    await cancelReservation(id);
    loadReservations();
  };

  const handleDelete = async (id) => {
    await deleteReservation(id);
    loadReservations();
  };

  const today = new Date();

  return (
    <div className="reservations-page">
      <h2>Mis Reservas</h2>
      {reservations.length === 0 ? (
        <p className="no-reservations-msg">
          🔎 No tienes ninguna reserva registrada.
        </p>
      ) : (
        <div className="reservations-list">
          {reservations.map((res) => {
            const isPast = new Date(res.checkOut) < new Date();

            return (
              <div
                key={res.id}
                className={`reservation-card ${isPast ? "past" : "upcoming"}`}
              >
                <img
                  src={res.stayImage}
                  alt={res.stayName}
                  className="stay-image"
                />
                <div className="reservation-info">
                  <h3>{res.stayName}</h3>
                  <p>
                    <strong>Ubicación:</strong> {res.stayLocation}
                  </p>
                  <p>
                    <strong>Fechas:</strong> {res.checkIn} → {res.checkOut}
                  </p>
                </div>
                <div className="reservation-actions">
                  {isPast ? (
                    <button onClick={() => handleDelete(res.id)}>
                      Eliminar
                    </button>
                  ) : (
                    <button onClick={() => handleDelete(res.id)}>
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReservationsPage;
