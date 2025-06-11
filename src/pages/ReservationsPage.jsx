import React, { useEffect, useState } from "react";
import {
  getMyReservations,
  deleteReservation,
} from "../services/reservationService";
import "../styles/pages/ReservationsPage.css";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal"; // importa tu modal

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const [isPastReservation, setIsPastReservation] = useState(false);

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await getMyReservations();
      setReservations(data);
    } catch (err) {
      console.error("Error cargando reservas:", err);
      toast.error("No se pudieron cargar tus reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const confirmDelete = (id, isPast) => {
    setReservationToDelete(id);
    setIsPastReservation(isPast);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteReservation(reservationToDelete);
      toast.success(
        isPastReservation
          ? "Reserva eliminada correctamente."
          : "Reserva cancelada correctamente."
      );
      setShowModal(false);
      setReservationToDelete(null);
      loadReservations();
    } catch {
      toast.error("Ocurrió un error. Inténtalo de nuevo.");
    }
  };

  const today = new Date();

  return (
    <div className="reservations-page">
      <div className="reservations-container">
        <h2>Mis Reservas</h2>

        {loading ? (
          <p className="loading-msg">⏳ Cargando reservas...</p>
        ) : reservations.length === 0 ? (
          <p className="no-reservations-msg">🔍 No tienes reservas activas.</p>
        ) : (
          <div className="reservations-list">
            {reservations.map((res) => {
              const isPast = new Date(res.checkOut) < today;
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
                    <p className="location">{res.stayLocation}</p>
                    <p className="dates">
                      <strong>Del</strong> {res.checkIn} <strong>al</strong>{" "}
                      {res.checkOut}
                    </p>
                    <p className={`status ${isPast ? "expired" : "active"}`}>
                      {isPast ? "Reserva finalizada" : "Reserva activa"}
                    </p>
                  </div>
                  <div className="reservation-actions">
                    {isPast ? (
                      <button
                        className="delete-btn"
                        onClick={() => confirmDelete(res.id, true)}
                      >
                        🗑 Eliminar
                      </button>
                    ) : (
                      <button
                        className="cancel-btn"
                        onClick={() => confirmDelete(res.id, false)}
                      >
                        ❌ Cancelar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <ConfirmDeleteModal
          title={isPastReservation ? "¿Eliminar reserva?" : "¿Cancelar reserva?"}
          entityName="la reserva seleccionada"
          warning={
            isPastReservation
              ? "Eliminarás el registro permanentemente."
              : "Cancelarás tu reserva activa. Esta acción no se puede deshacer."
          }
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default ReservationsPage;
