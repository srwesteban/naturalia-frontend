import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addFavorite, removeFavorite, getFavoritesByUser } from "../../services/favoriteService";
import { toast } from "react-toastify";
import "../../styles/components/stays/StayListCard.css";

const StayListCard = ({ stay, userId }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      try {
        const favs = await getFavoritesByUser(userId);
        setIsFavorite(favs.some(fav => fav.stayId === stay.id));
      } catch (err) {
        console.error("❌ Error al obtener favoritos:", err);
      }
    };

    fetchFavorites();
  }, [userId, stay.id]);

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();

    if (!userId) {
      toast.warn("Debes iniciar sesión para marcar favoritos", { theme: "colored" });
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(userId, stay.id);
      } else {
        await addFavorite(userId, stay.id);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("❌ Error al modificar favorito:", err);
      toast.error("No se pudo actualizar el favorito", { theme: "colored" });
    }
  };

  return (
    <div className="stay-list-card" onClick={() => navigate(`/stays/${stay.id}`)}>
      <div className="heart-icon" onClick={handleFavoriteClick}>
        {isFavorite ? (
          <AiFillHeart className="favorite-icon filled" />
        ) : (
          <AiOutlineHeart className="favorite-icon" />
        )}
      </div>

      <img src={stay.images[0]} alt={stay.name} />
      <div className="stay-info">
        <div className="text-block">
          <h3>{stay.name}</h3>
          <p>{stay.location}</p>
          <p className="stay-description">
            {stay.description?.slice(0, 100)}...
          </p>
        </div>
        <div className="price-block">
          <span className="price">${stay.pricePerNight} / noche</span>
        </div>
      </div>
    </div>
  );
};

export default StayListCard;
