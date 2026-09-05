import { formatPrice } from "../../utils/format";
import "./AdminFoodList.css";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3ece0'/%3E%3C/svg%3E";

export function AdminFoodList({
  foods,
  onEdit,
  onDelete,
  onToggleAvailability,
  pendingId,
}) {
  return (
    <div className="admin-food-list">
      {foods.map((food) => (
        <div className="admin-food-row" key={food._id}>
          <img
            src={food.image || FALLBACK_IMAGE}
            alt={food.name}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
          />

          <div className="admin-food-row-info">
            <div className="admin-food-row-top">
              <h4>{food.name}</h4>
              <span className="admin-food-row-price">{formatPrice(food.price)}</span>
            </div>
            <p>{food.description}</p>
            <span className="admin-food-row-category">{food.category}</span>
          </div>

          <div className="admin-food-row-actions">
            <label className="availability-toggle">
              <input
                type="checkbox"
                checked={food.available}
                onChange={() => onToggleAvailability(food)}
                disabled={pendingId === food._id}
              />
              <span>{food.available ? "Available" : "Unavailable"}</span>
            </label>

            <button className="btn btn-outline" onClick={() => onEdit(food)}>
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onDelete(food)}
              disabled={pendingId === food._id}
            >
              {pendingId === food._id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
