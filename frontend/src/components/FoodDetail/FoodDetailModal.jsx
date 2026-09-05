import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useToast } from "../../context/ToastContext";
import { formatPrice } from "../../utils/format";
import { getDemoRating, getDemoReviews } from "../../utils/demoContent";
import { StarRating } from "../StarRating/StarRating";
import "./FoodDetailModal.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3ece0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%238a7f6e' text-anchor='middle' dy='.3em'%3ENo image%3C/text%3E%3C/svg%3E";

export function FoodDetailModal({ food, allFoods = [], onClose, onSelectFood }) {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [imgSrc, setImgSrc] = useState(food.image || FALLBACK_IMAGE);

  const { rating, reviewCount } = getDemoRating(food);
  const reviews = getDemoReviews(food);
  const favorite = isFavorite(food._id);

  const related = allFoods
    .filter((f) => f._id !== food._id && f.category === food.category && f.available)
    .slice(0, 3);

  useEffect(() => {
    setQuantity(1);
    setImgSrc(food.image || FALLBACK_IMAGE);
  }, [food]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAdd = () => {
    addItem(food, quantity);
    showToast(`${quantity} × ${food.name} added to cart`);
    onClose();
  };

  const handleFavorite = () => {
    toggleFavorite(food._id);
    showToast(
      favorite ? `Removed ${food.name} from favorites` : `Saved ${food.name} to favorites`
    );
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="food-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-label={food.name}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="food-detail-scroll">
          <div className="food-detail-top">
            <div className="food-detail-image">
              <img src={imgSrc} alt={food.name} onError={() => setImgSrc(FALLBACK_IMAGE)} />
              <button
                type="button"
                className={`food-detail-favorite ${favorite ? "is-active" : ""}`}
                onClick={handleFavorite}
                aria-pressed={favorite}
                aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
              >
                <HeartGlyph filled={favorite} />
              </button>
            </div>

            <div className="food-detail-body">
              <span className="food-detail-category">{food.category}</span>
              <h2>{food.name}</h2>
              <StarRating rating={rating} reviewCount={reviewCount} size="md" />
              <p className="food-detail-desc">{food.description}</p>

              <div className="food-detail-meta">
                <span className="food-detail-price">{formatPrice(food.price)}</span>
                <span
                  className={`food-detail-availability ${
                    food.available ? "is-available" : "is-unavailable"
                  }`}
                >
                  {food.available ? "Available now" : "Currently unavailable"}
                </span>
              </div>

              {food.available && (
                <div className="food-detail-actions">
                  <div className="quantity-selector">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button className="btn btn-primary" onClick={handleAdd}>
                    Add {quantity > 1 ? `${quantity} ` : ""}to cart ·{" "}
                    {formatPrice(food.price * quantity)}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="food-detail-reviews">
            <h3>What people are saying</h3>
            <div className="review-list">
              {reviews.map((review) => (
                <div className="review-item" key={review.id}>
                  <div className="review-item-top">
                    <span className="review-name">{review.name}</span>
                    <span className="review-stars" aria-label={`${review.stars} out of 5 stars`}>
                      {"★".repeat(review.stars)}
                      {"☆".repeat(5 - review.stars)}
                    </span>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))}
            </div>
            <p className="review-disclaimer">Demo reviews shown for illustration.</p>
          </div>

          {related.length > 0 && (
            <div className="food-detail-related">
              <h3>You might also like</h3>
              <div className="related-list">
                {related.map((item) => (
                  <button
                    key={item._id}
                    type="button"
                    className="related-item"
                    onClick={() => onSelectFood?.(item)}
                  >
                    <img
                      src={item.image || FALLBACK_IMAGE}
                      alt={item.name}
                      onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                    />
                    <span className="related-item-name">{item.name}</span>
                    <span className="related-item-price">{formatPrice(item.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeartGlyph({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.3C.5 8 2 4.5 5.6 4c2.1-.3 4 .8 6.4 3.3C14.4 4.8 16.3 3.7 18.4 4c3.6.5 5.1 4 3.6 7.2-2.5 4.7-10 9.3-10 9.3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
