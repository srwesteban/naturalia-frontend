import React, { useEffect, useState } from "react";
import { getFavoritesByUser } from "../services/favoriteService";
import StayListCard from "../components/stays/StayListCard";
import { getUserId } from "../services/authService";
import "../styles/pages/FavoritesPage.css";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const id = await getUserId();
        const favs = await getFavoritesByUser(id);
        setFavorites(favs);
      } catch (err) {
        console.error("❌ Error al obtener favoritos:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFavorites = favorites.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="favorites-page">
      <h2>Mis Favoritos</h2>

      {loading ? (
        <p className="loading">Cargando favoritos...</p>
      ) : favorites.length === 0 ? (
        <p className="no-favorites">
          Aún no has marcado ningún alojamiento como favorito.
        </p>
      ) : (
        <>
          <div className="favorites-grid">
            {currentFavorites.map((fav) => (
              <StayListCard
                key={fav.stayId}
                stay={{
                  id: fav.stayId,
                  name: fav.stayName,
                  location: fav.location,
                  images: [fav.stayImage],
                }}
                userId={fav.userId}
                onUnfavorite={() => {
                  setFavorites((prev) =>
                    prev.filter((f) => f.stayId !== fav.stayId)
                  );
                }}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => goToPage(1)}
                disabled={currentPage === 1}
              >
                Inicio
              </button>
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <span className="page-indicator">
                Página {currentPage} de {totalPages}
              </span>
              <button
                className="page-btn"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
