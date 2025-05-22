import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStayById } from '../services/stayService';
import Gallery from '../components/Gallery';
import '../styles/pages/StayDetail.css';

const StayDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay, setStay] = useState(null);

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

  if (!stay) return <p>Cargando...</p>;

  return (
    <div className="stay-detail">
      <header className="detail-header">
        <h2>{stay.name}</h2>
        <button className="back-button" onClick={() => navigate(-1)}>← Volver</button>
      </header>

      <section className="detail-body">
        <Gallery images={stay.images} />

        <p className="description">{stay.description}</p>
        <p><strong>Ubicación:</strong> {stay.location}</p>
        <p><strong>Capacidad:</strong> {stay.capacity} personas</p>
        <p><strong>Precio:</strong> ${stay.pricePerNight} / noche</p>
      </section>
    </div>
  );
};

export default StayDetail;
