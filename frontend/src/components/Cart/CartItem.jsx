import { formatPrice } from "../../utils/format";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3ece0'/%3E%3C/svg%3E";

export function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="cart-item">
      <img
        src={item.image || FALLBACK_IMAGE}
        alt={item.name}
        onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
      />

      <div className="cart-item-info">
        <div className="cart-item-top">
          <h4>{item.name}</h4>
          <button
            type="button"
            className="cart-item-remove"
            onClick={() => onRemove(item._id)}
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>

        <div className="cart-item-bottom">
          <div className="quantity-selector quantity-selector-sm">
            <button
              type="button"
              onClick={() => onDecrement(item._id)}
              aria-label={`Decrease ${item.name} quantity`}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              onClick={() => onIncrement(item._id)}
              aria-label={`Increase ${item.name} quantity`}
            >
              +
            </button>
          </div>
          <span className="cart-item-price">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
