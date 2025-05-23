import React, { useEffect, useState } from "react";
import "../styles/pages/AdminPanel.css";
import { getStaySummaries, deleteStayById } from "../services/stayService";
import StayTable from "../components/StayTable";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stays, setStays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const data = await getStaySummaries();
        setStays(data.map(({ id, name }) => ({ id, name }))); // Simplificado
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStays();
  }, []);

  const handleEdit = (id) => {
    alert(`Editar stay con ID: ${id}`);
    // Podrías usar navigate(`/editar/${id}`) en el futuro
  };

  if (isMobile) {
    return (
      <div className="admin-panel">
        <h2>Panel de Administración</h2>
        <p className="mobile-warning">
          Esta sección no está disponible desde móvil o tablet.
        </p>
      </div>
    );
  }

  const [showModal, setShowModal] = useState(false);
  const [stayToDelete, setStayToDelete] = useState(null);

  const handleDelete = (id) => {
    const stay = stays.find((s) => s.id === id);
    setStayToDelete(stay);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteStayById(stayToDelete.id);
      setStays((prev) => prev.filter((s) => s.id !== stayToDelete.id));
    } catch (err) {
      console.error("Error al eliminar:", err);
    } finally {
      setShowModal(false);
      setStayToDelete(null);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <button onClick={() => navigate("/create")} className="add-btn">
        ➕ Agregar producto
      </button>
      <StayTable stays={stays} onEdit={handleEdit} onDelete={handleDelete} />
      {showModal && (
        <ConfirmDeleteModal
          stayName={stayToDelete?.name}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default AdminPanel;
