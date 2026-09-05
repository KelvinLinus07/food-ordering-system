import { formatPrice } from "../../utils/format";
import { getDemoRating } from "../../utils/demoContent";
import { StarRating } from "../StarRating/StarRating";
import "./PopularToday.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3ece0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='16' fill='%238a7f6e' text-anchor='middle' dy='.3em'%3ENo image%3C/text%3E%3C/svg%3E";

export function PopularToday({ foods, onOpenDetails }) {
  if (foods.length === 0) return null;

  return (
    <section className="popular-section">
      <div className="container">
        <div className="popular-header">
          <h2>Popular today</h2>
          <p>Loved by regulars — these dishes are flying off the menu.</p>
        </div>

        <div className="popular-scroll">
          {foods.map((food) => {
            const { rating } = getDemoRating(food);
            return (
              <button
                key={food._id}
                type="button"
                className="popular-card"
                onClick={() => onOpenDetails(food)}
              >
                <img
                  src={food.image || FALLBACK_IMAGE}
                  alt={food.name}
                  onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                />
                <div className="popular-card-body">
                  <p className="popular-card-name">{food.name}</p>
                  <div className="popular-card-meta">
                    <StarRating rating={rating} size="sm" />
                    <span className="popular-card-price">{formatPrice(food.price)}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
