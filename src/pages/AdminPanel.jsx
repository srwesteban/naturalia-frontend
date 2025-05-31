import React, { useEffect, useState } from "react";
import "../styles/pages/AdminPanel.css";
import { getStaySummaries, deleteStayById, updateStay, getStayById } from "../services/stayService";
import StayTable from "../components/stays/StayTable";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import EditStayModal from "../components/stays/EditStayModal";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stays, setStays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stayToDelete, setStayToDelete] = useState(null);
  const [stayToEdit, setStayToEdit] = useState(null);
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
        setStays(data);
      } catch (err) {
        console.error("Error al cargar stays:", err.message);
      }
    };

    fetchStays();
  }, []);

  const handleEdit = async (id) => {
    try {
      const detailedStay = await getStayById(id);
      setStayToEdit(detailedStay);
    } catch (err) {
      console.error("Error al cargar detalles del stay:", err);
    }
  };

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

  const handleChangeType = async (id, newType) => {
    try {
      const stay = stays.find((s) => s.id === id);
      await updateStay(id, { ...stay, type: newType });
      setStays((prev) =>
        prev.map((s) => (s.id === id ? { ...s, type: newType } : s))
      );
    } catch (err) {
      console.error("Error al cambiar tipo:", err);
    }
  };

  // Ajuste: Alineamos la firma con EditStayModal
  const handleSaveEdit = async (id, updatedStay) => {
    try {
      await updateStay(id, updatedStay);
      setStays((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updatedStay } : s))
      );
      setStayToEdit(null);
    } catch (err) {
      console.error("Error al guardar cambios:", err);
    }
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

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>

      <button onClick={() => navigate("/create")} className="add-btn">
        ➕ Agregar producto
      </button>
      <StayTable
        stays={stays}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeType={handleChangeType}
      />
      {showModal && (
        <ConfirmDeleteModal
          stayName={stayToDelete?.name}
          onClose={() => setShowModal(false)}
          onConfirm={confirmDelete}
        />
      )}
      {stayToEdit && (
        <EditStayModal
          stayId={stayToEdit.id}
          initialData={stayToEdit}
          onClose={() => setStayToEdit(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default AdminPanel;
