import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/format";
import { calculateOrderTotals, FREE_DELIVERY_THRESHOLD } from "../../utils/pricing";
import { CartItem } from "./CartItem";
import { EmptyState } from "../EmptyState/EmptyState";
import "./CartDrawer.css";

export function CartDrawer({ open, onClose, onCheckout }) {
  const { items, subtotal, increment, decrement, removeItem, clearCart } =
    useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const { deliveryFee, tax, total } = calculateOrderTotals(subtotal);
  const amountToFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  return (
    <div className="cart-overlay" onMouseDown={onClose}>
      <aside
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="cart-drawer-header">
          <h3>Your cart</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <EmptyState
            icon="🛒"
            title="Your cart is empty"
            message="Add something delicious from the menu to get started."
          />
        ) : (
          <>
            {amountToFreeDelivery > 0 && (
              <div className="cart-free-delivery-banner">
                Add {formatPrice(amountToFreeDelivery)} more for free delivery
              </div>
            )}

            <div className="cart-drawer-items">
              {items.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onIncrement={increment}
                  onDecrement={decrement}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <div className="cart-drawer-footer">
              <button className="btn-ghost cart-clear" onClick={clearCart}>
                Clear cart
              </button>

              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Delivery fee</span>
                <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
              </div>
              <div className="cart-summary-row">
                <span>Estimated tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button className="btn btn-primary cart-checkout-btn" onClick={onCheckout}>
                Proceed to checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
