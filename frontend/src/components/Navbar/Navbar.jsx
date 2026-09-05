import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import "./Navbar.css";

export function Navbar({ onCartClick }) {
  const { itemCount } = useCart();
  const { favoriteIds } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="navbar-brand-mark">T</span>
          <span className="navbar-brand-name">Tadka</span>
        </Link>

        <nav className={`navbar-links ${menuOpen ? "is-open" : ""}`}>
          <NavLink
            to="/"
            end
            className="navbar-link"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </NavLink>
          <NavLink
            to="/favorites"
            className="navbar-link navbar-link-favorites"
            onClick={() => setMenuOpen(false)}
          >
            Favorites
            {favoriteIds.length > 0 && (
              <span className="navbar-link-count">{favoriteIds.length}</span>
            )}
          </NavLink>
          <NavLink
            to="/admin"
            className="navbar-link"
            onClick={() => setMenuOpen(false)}
          >
            Manage food
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="cart-trigger"
            onClick={onCartClick}
            aria-label={`Open cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
          >
            <CartGlyph />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </button>

          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function CartGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.47 1.3h8.36a1.5 1.5 0 0 0 1.47-1.19L20.5 8H6.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20.5" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20.5" r="1.4" fill="currentColor" />
    </svg>
  );
}
