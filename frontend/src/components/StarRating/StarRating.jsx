import "./StarRating.css";

export function StarRating({ rating, reviewCount, size = "md" }) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <span className={`star-rating star-rating-${size}`}>
      <span className="star-rating-icon" aria-hidden="true">★</span>
      <span className="star-rating-value">{rating.toFixed(1)}</span>
      {reviewCount != null && (
        <span className="star-rating-count">({reviewCount})</span>
      )}
      <span className="visually-hidden">{`Rated ${rounded} out of 5`}</span>
    </span>
  );
}
