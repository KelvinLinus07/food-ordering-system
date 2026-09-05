import "./OffersBanner.css";

const OFFERS = [
  {
    icon: "🎉",
    title: "20% off your first order",
    detail: "Use code WELCOME20 at checkout",
  },
  {
    icon: "🚚",
    title: "Free delivery above ₹499",
    detail: "Applied automatically in your cart",
  },
  {
    icon: "⏱️",
    title: "Delivered in under an hour",
    detail: "Fresh, hot, and on time",
  },
];

export function OffersBanner() {
  return (
    <section className="offers-banner">
      <div className="container offers-grid">
        {OFFERS.map((offer) => (
          <div className="offer-card" key={offer.title}>
            <span className="offer-icon" aria-hidden="true">
              {offer.icon}
            </span>
            <div>
              <p className="offer-title">{offer.title}</p>
              <p className="offer-detail">{offer.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
