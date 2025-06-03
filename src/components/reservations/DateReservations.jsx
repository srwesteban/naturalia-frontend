import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createReservation,
  getReservationsByStay,
} from "../../services/reservationService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/reservation/DateReservation.css";
import { useAuth } from "../../hooks/useAuth";
import { getUserId } from "../../services/authService";

const DateReservation = ({ stayId }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [error, setError] = useState("");
  const { user, loading } = useAuth();
  const [reservedDates, setReservedDates] = useState([]);

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
      const userId = await getUserId(); // ✅ ID correcto desde backend
      console.log("🆔 Usuario:", userId);
      console.log("🏕️ Alojamiento:", stayId);
      console.log("📅 checkIn:", checkIn);
      console.log("📅 checkOut:", checkOut);

      await createReservation({
        stayId,
        userId,
        checkIn: checkIn.toISOString().split("T")[0],
        checkOut: checkOut.toISOString().split("T")[0],
      });

      navigate("/reservas");
    } catch (err) {
      setError(err.message || "Error al crear la reserva.");
      console.error("❌ Error al reservar:", err);
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
            allDates.push(new Date(d.getTime())); // ✅ clona correctamente cada fecha
          }
        });

        setReservedDates(allDates);
      } catch (err) {
        console.error("Error al cargar reservas:", err.message);
      }
    };

    fetchReservedDates();
  }, [stayId]);

  if (loading) return null;

  return (
    <div className="date-reservation">
      <h4>Reservar fechas</h4>
      <div className="calendar-pair">
        <div>
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

      {error && <p className="error-message">{error}</p>}

      <button onClick={handleSubmit} className="reserve-button">
        Reservar
      </button>
    </div>
  );
};

export default DateReservation;
