import React, { useEffect, useState } from "react";
import "../styles/pages/AdminPanelPage.css";
import {
  getStaySummaries,
  deleteStayById,
  updateStayFull,
  getStayById,
} from "../services/stayService";
import StayTable from "../components/stays/StayTable";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import EditStayModal from "../components/modals/EditStayModal";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stays, setStays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [stayToDelete, setStayToDelete] = useState(null);
  const [stayToEdit, setStayToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStayId, setEditingStayId] = useState(null);

  const itemsPerPage = 20;
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

  const totalPages = Math.ceil(stays.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentStays = stays.slice(indexOfFirst, indexOfLast);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEdit = async (id) => {
    setEditingStayId(id);
    try {
      const detailedStay = await getStayById(id);
      setStayToEdit(detailedStay);
    } catch (err) {
      console.error("Error al cargar detalles del stay:", err);
    } finally {
      setEditingStayId(null);
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
      await updateStayFull(id, { ...stay, type: newType });
      setStays((prev) =>
        prev.map((s) => (s.id === id ? { ...s, type: newType } : s))
      );
    } catch (err) {
      console.error("Error al cambiar tipo:", err);
    }
  };

  const handleSaveEdit = async (id, updatedStay) => {
    try {
      await updateStayFull(id, updatedStay);
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

      <button onClick={() => navigate("/createstay")} className="add-btn">
        ➕ Agregar producto
      </button>

      <StayTable
        stays={currentStays}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeType={handleChangeType}
        editingStayId={editingStayId}
      />

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          ⬅ Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente ➡
        </button>
      </div>

      {showModal && (
        <ConfirmDeleteModal
          entityName={stayToDelete?.name}
          title="¿Eliminar alojamiento?"
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
