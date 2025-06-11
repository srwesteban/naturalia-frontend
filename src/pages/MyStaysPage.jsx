import React, { useEffect, useState } from "react";
import {
  getMyStays,
  updateStay,
  deleteStayById,
} from "../services/stayService";
import { getUserId } from "../services/authService";
import { toast } from "react-toastify";
import EditStayModal from "../components/modals/EditStayModal";
import ConfirmDeleteModal from "../components/modals/ConfirmDeleteModal";
import StayListCard from "../components/stays/StayListCard";
import "../styles/pages/MyStaysPage.css";

const MyStaysPage = () => {
  const [stays, setStays] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingStay, setEditingStay] = useState(null);
  const [deletingStay, setDeletingStay] = useState(null);

  const formatStay = (stay) => ({
    ...stay,
    imageUrl:
      stay.images?.[0] || "https://via.placeholder.com/400x300?text=Sin+imagen",
    description:" ",
    location: "",
    pricePerNight: ""
  });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const id = await getUserId();
        setUserId(id);
        const data = await getMyStays();
        setStays(data);
      } catch (err) {
        console.error("❌ Error al cargar alojamientos", err);
        toast.error("No se pudieron cargar tus alojamientos.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleSave = async (stayId, payload) => {
    await updateStay(stayId, payload);
    loadStays();
  };

  const loadStays = async () => {
    try {
      const data = await getMyStays();
      setStays(data);
    } catch (err) {
      toast.error("Error al recargar alojamientos.");
    }
  };

  const [deleteError, setDeleteError] = useState("");

  const handleDelete = async () => {
    try {
      await deleteStayById(deletingStay.id);
      toast.success("Alojamiento eliminado.");
      setDeletingStay(null);
      setDeleteError("");
      loadStays();
    } catch (err) {
      const msg = err.message || "Error al eliminar alojamiento.";
      setDeleteError(msg);
    }
  };

  return (
    <div className="my-stays-page">
      <div className="content-wrapper">
        <h2>Mis Alojamientos</h2>

        {loading ? (
          <p>Cargando alojamientos...</p>
        ) : stays.length === 0 ? (
          <p>No tienes alojamientos creados aún.</p>
        ) : (
          <div className="stay-grid">
            {stays.map((stay) => (
              <div key={stay.id} className="stay-card-wrapper">
                <StayListCard stay={formatStay(stay)} userId={userId} />
                <div className="stay-card-actions">
                  <button onClick={() => setEditingStay(stay)}>
                    ✏️ Editar
                  </button>
                  <button onClick={() => setDeletingStay(stay)}>
                    🗑 Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingStay && (
        <EditStayModal
          stayId={editingStay.id}
          initialData={editingStay}
          onClose={() => setEditingStay(null)}
          onSave={handleSave}
        />
      )}

      {deletingStay && (
        <ConfirmDeleteModal
          title="¿Eliminar alojamiento?"
          entityName={deletingStay.name}
          warning="Esta acción no se puede deshacer."
          error={deleteError}
          onClose={() => {
            setDeletingStay(null);
            setDeleteError("");
          }}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default MyStaysPage;
