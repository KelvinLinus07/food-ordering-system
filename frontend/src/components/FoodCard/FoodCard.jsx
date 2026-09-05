import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useToast } from "../../context/ToastContext";
import { formatPrice } from "../../utils/format";
import { getDemoRating, isBestSeller } from "../../utils/demoContent";
import { StarRating } from "../StarRating/StarRating";
import "./FoodCard.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3ece0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%238a7f6e' text-anchor='middle' dy='.3em'%3ENo image%3C/text%3E%3C/svg%3E";

export function FoodCard({ food, onOpenDetails }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [imgSrc, setImgSrc] = useState(food.image || FALLBACK_IMAGE);

  const { rating, reviewCount } = getDemoRating(food);
  const favorite = isFavorite(food._id);
  const bestSeller = isBestSeller(food);

  const handleAdd = (e) => {
    e.stopPropagation();
    if (!food.available) return;
    addItem(food, 1);
    showToast(`${food.name} added to cart`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(food._id);
    showToast(
      favorite ? `Removed ${food.name} from favorites` : `Saved ${food.name} to favorites`
    );
  };

  return (
    <article
      className={`food-card ${!food.available ? "is-unavailable" : ""}`}
      onClick={() => onOpenDetails(food)}
    >
      <div className="food-card-image-wrap">
        <img
          src={imgSrc}
          alt={food.name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
        />
        <div className="food-card-tags">
          <span className="food-card-category">{food.category}</span>
          {bestSeller && <span className="food-card-bestseller">Best seller</span>}
        </div>
        {!food.available && (
          <span className="food-card-unavailable-tag">Sold out</span>
        )}
        <button
          type="button"
          className={`food-card-favorite ${favorite ? "is-active" : ""}`}
          onClick={handleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? `Remove ${food.name} from favorites` : `Save ${food.name} to favorites`}
        >
          <HeartGlyph filled={favorite} />
        </button>
      </div>

      <div className="food-card-body">
        <div className="food-card-top">
          <h3>{food.name}</h3>
          <span className="food-card-price">{formatPrice(food.price)}</span>
        </div>

        <StarRating rating={rating} reviewCount={reviewCount} size="sm" />

        <p className="food-card-desc">{food.description}</p>

        <button
          type="button"
          className="btn btn-primary food-card-add"
          onClick={handleAdd}
          disabled={!food.available}
        >
          {food.available ? "Add to cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

function HeartGlyph({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2.1-.3 4 .8 6.4 3.3C14.4 4.8 16.3 3.7 18.4 4c3.6.5 5.1 4 3.6 7.2-2.5 4.7-10 9.3-10 9.3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
