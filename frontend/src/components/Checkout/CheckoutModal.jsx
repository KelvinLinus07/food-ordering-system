import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatPrice, generateOrderId, estimateDeliveryWindow } from "../../utils/format";
import { calculateOrderTotals } from "../../utils/pricing";
import "./CheckoutModal.css";

export function CheckoutModal({ onClose }) {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [touched, setTouched] = useState({});
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const { deliveryFee, tax, total } = calculateOrderTotals(subtotal);

  const errors = {
    name: form.name.trim().length < 2 ? "Enter your full name" : null,
    phone: !/^\d{10}$/.test(form.phone.trim()) ? "Enter a valid 10-digit phone number" : null,
    address: form.address.trim().length < 8 ? "Enter a complete delivery address" : null,
  };

  const isValid = !errors.name && !errors.phone && !errors.address;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, address: true });
    if (!isValid) return;

    setOrder({
      id: generateOrderId(),
      customer: form,
      items,
      subtotal,
      deliveryFee,
      tax,
      total,
      eta: estimateDeliveryWindow(),
    });
    clearCart();
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        className="checkout-modal"
        role="dialog"
        aria-modal="true"
        aria-label={order ? "Order confirmation" : "Checkout"}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        {order ? (
          <OrderSuccess order={order} onClose={onClose} />
        ) : (
          <>
            <h2>Checkout</h2>
            <p className="checkout-subtitle">
              This is a demo checkout — no real payment is taken.
            </p>

            <form className="checkout-form" onSubmit={handleSubmit} noValidate>
              <div className="checkout-fields">
                <label>
                  Full name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    placeholder=" "
                  />
                  {touched.name && errors.name && (
                    <span className="field-error">{errors.name}</span>
                  )}
                </label>

                <label>
                  Phone number
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        phone: e.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    placeholder="XXXXXXXXXXX"
                  />
                  {touched.phone && errors.phone && (
                    <span className="field-error">{errors.phone}</span>
                  )}
                </label>

                <label>
                  Delivery address
                  <textarea
                    rows={3}
                    value={form.address}
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    onBlur={() => setTouched((t) => ({ ...t, address: true }))}
                    placeholder="House no., street, area, city, pincode"
                  />
                  {touched.address && errors.address && (
                    <span className="field-error">{errors.address}</span>
                  )}
                </label>
              </div>

              <div className="checkout-summary">
                <h4>Order summary</h4>
                {items.map((item) => (
                  <div className="checkout-summary-row" key={item._id}>
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="checkout-summary-row">
                  <span>Delivery fee</span>
                  <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
                </div>
                <div className="checkout-summary-row">
                  <span>Estimated tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="checkout-summary-row checkout-summary-total">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button type="submit" className="btn btn-primary checkout-submit">
                Place order · {formatPrice(total)}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function OrderSuccess({ order, onClose }) {
  return (
    <div className="order-success">
      <div className="order-success-icon" aria-hidden="true">✓</div>
      <h2>Order placed successfully!</h2>
      <p className="checkout-subtitle">
        We've received your order. Here are the details.
      </p>

      <div className="order-success-card">
        <div className="checkout-summary-row">
          <span>Order ID</span>
          <span className="order-id">{order.id}</span>
        </div>
        <div className="checkout-summary-row">
          <span>Estimated delivery</span>
          <span>{order.eta}</span>
        </div>
        <div className="checkout-summary-row">
          <span>Delivering to</span>
          <span className="order-address">{order.customer.address}</span>
        </div>

        <div className="order-success-divider" />

        {order.items.map((item) => (
          <div className="checkout-summary-row" key={item._id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="checkout-summary-row">
          <span>Delivery fee</span>
          <span>{order.deliveryFee === 0 ? "Free" : formatPrice(order.deliveryFee)}</span>
        </div>
        <div className="checkout-summary-row">
          <span>Estimated tax</span>
          <span>{formatPrice(order.tax)}</span>
        </div>
        <div className="checkout-summary-row checkout-summary-total">
          <span>Total paid</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <button className="btn btn-primary checkout-submit" onClick={onClose}>
        Back to menu
      </button>
    </div>
  );
}
