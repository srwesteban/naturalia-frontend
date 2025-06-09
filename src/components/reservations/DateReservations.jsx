import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createReservation,
  getReservationsByStay,
} from "../../services/reservationService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/reservation/DateReservation.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { getUserId } from "../../services/authService";
import FakePayModal from "../modals/FakePayModal.jsx";

const DateReservation = ({ stayId, pricePerNight }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [error, setError] = useState("");
  const { user, loading } = useAuth();
  const [reservedDates, setReservedDates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [reservationData, setReservationData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = async () => {
    if (!user || user.role !== "USER") {
      setError("Solo los usuarios registrados pueden hacer reservas.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Debes seleccionar fechas de llegada y salida.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("La fecha de salida debe ser posterior a la de llegada.");
      return;
    }

    try {
      const userId = await getUserId();
      const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const total = days * pricePerNight;

      setReservationData({
        stayId,
        userId,
        checkIn: checkIn.toISOString().split("T")[0],
        checkOut: checkOut.toISOString().split("T")[0],
        stayPricePerNight: pricePerNight,
        totalPrice: total,
      });

      setTotalPrice(total);
      setShowModal(true);
    } catch (err) {
      setError("Error interno. Intenta de nuevo más tarde.");
    }
  };

  const handleSuccess = async () => {
    try {
      await createReservation(reservationData);
    } catch (err) {
      console.error("❌ Error al crear reserva tras pago:", err);
    }
  };

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const data = await getReservationsByStay(stayId);

        const allDates = [];

        data.forEach((res) => {
          const start = new Date(res.checkIn);
          const end = new Date(res.checkOut);

          for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            allDates.push(new Date(d.getTime()));
          }
        });

        setReservedDates(allDates);
      } catch (err) {
        console.error("Error al cargar reservas:", err.message);
      }
    };

    fetchReservedDates();
  }, [stayId]);

  useEffect(() => {
    if (checkIn && checkOut && pricePerNight) {
      const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const total = days * pricePerNight;
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, pricePerNight]);

  if (loading) return null;

  return (
    <div className="date-reservation">
      <h4>Reservar fechas</h4>
      <div className="calendar-pair">
        <div className="picker">
          <label>Llegada:</label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            excludeDates={reservedDates}
            placeholderText="Selecciona fecha"
          />
        </div>
        <div>
          <label>Salida:</label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            excludeDates={reservedDates}
            placeholderText="Selecciona fecha"
          />
        </div>
      </div>

      <p className="total-price">
        Total a pagar por la estadía:{" "}
        <strong>$ {totalPrice.toLocaleString("es-CO")}</strong> x{" "}
        {checkIn && checkOut
          ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))
          : 0}{" "}
        noche
        {checkOut &&
        checkIn &&
        Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) > 1
          ? "s"
          : ""}
      </p>

      {error && <p className="error-message">{error}</p>}

      <button onClick={handleSubmit} className="reserve-button">
        Reservar
      </button>

      <FakePayModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleSuccess}
        totalPrice={totalPrice.toLocaleString("es-CO")}
        pricePerNight={pricePerNight}
        checkIn={checkIn?.toISOString().split("T")[0]}
        checkOut={checkOut?.toISOString().split("T")[0]}
      />
    </div>
  );
};

export default DateReservation;
