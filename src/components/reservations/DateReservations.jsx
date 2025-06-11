import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/components/reservation/DateReservation.css";
import {
  createReservation,
  getReservationsByStay,
} from "../../services/reservationService";
import { useAuth } from "../../context/AuthContext";
import { getUserId } from "../../services/authService";
import FakePayModal from "../modals/FakePayModal";

const DateReservation = ({ stayId, pricePerNight }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [reservationData, setReservationData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user, effectiveRole } = useAuth();

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const data = await getReservationsByStay(stayId);
        const allDates = [];

        data.forEach((res) => {
          const start = new Date(res.checkIn);
          const end = new Date(res.checkOut);
          for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            allDates.push(new Date(d.getTime())); // ✅ incluye checkOut correctamente
          }
        });

        setReservedDates(allDates);
      } catch (error) {
        console.error("Error al obtener fechas reservadas:", error.message);
      }
    };

    fetchReservedDates();
  }, [stayId]);

  useEffect(() => {
    if (checkIn && checkOut) {
      const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setTotalPrice(days * pricePerNight);
    } else {
      setTotalPrice(0);
    }
  }, [checkIn, checkOut, pricePerNight]);

  const handleSubmit = async () => {
    setError("");

    if (!user || !["USER"].includes(effectiveRole)) {
      setError(`Debes iniciar sesión como "usuario" para reservar.`);
      return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError("Selecciona un rango válido de fechas.");
      return;
    }

    try {
      const userId = await getUserId();

      const payload = {
        stayId,
        userId,
        checkIn: checkIn.toISOString().split("T")[0],
        checkOut: checkOut.toISOString().split("T")[0],
        stayPricePerNight: pricePerNight,
        totalPrice,
      };

      setReservationData(payload);
      setShowModal(true);
    } catch {
      setError("Error al procesar la reserva. inicia sesion nuevamente");
    }
  };

  const handleSuccess = async () => {
    try {
      await createReservation(reservationData);
      setShowModal(false);
    } catch (error) {
      console.error("❌ Error al guardar reserva:", error.message);
    }
  };

  return (
    <div className="reservation-box">
      <h3 className="reservation-title">Selecciona tus fechas</h3>

      <div className="picker-group">
        <div className="picker-column">
          <label>Check-in</label>
          <DatePicker
            selected={checkIn}
            onChange={setCheckIn}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            excludeDates={reservedDates}
            placeholderText="Fecha de entrada"
            popperPlacement="bottom-start"
            portalId="root"
          />
        </div>
        <div className="picker-column">
          <label>Check-out</label>
          <DatePicker
            selected={checkOut}
            onChange={setCheckOut}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            excludeDates={reservedDates}
            placeholderText="Fecha de salida"
            popperPlacement="bottom-start"
            portalId="root"
          />
        </div>
      </div>

      <div className="reservation-summary">
        <p>
          Total: <strong>${totalPrice.toLocaleString("es-CO")}</strong>
        </p>
        {error && <p className="reservation-error">{error}</p>}
      </div>

      <button className="reserve-button" onClick={handleSubmit}>
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
