import "./Loading.css";

export function FoodCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-block skeleton-image" />
      <div className="skeleton-card-body">
        <div className="skeleton-block skeleton-line skeleton-line-title" />
        <div className="skeleton-block skeleton-line" />
        <div className="skeleton-block skeleton-line skeleton-line-short" />
      </div>
    </div>
  );
}

export function FoodGridSkeleton({ count = 6 }) {
  return (
    <div className="food-grid" role="status" aria-label="Loading menu">
      {Array.from({ length: count }).map((_, i) => (
        <FoodCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function Spinner({ label = "Loading" }) {
  return (
    <div className="spinner-wrap" role="status">
      <span className="spinner" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
}
