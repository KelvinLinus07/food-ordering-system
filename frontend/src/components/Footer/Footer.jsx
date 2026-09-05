import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-brand-mark">T</span>
          <div>
            <p className="footer-brand-name">Tadka</p>
            <p className="footer-tagline">Good food, ordered right.</p>
          </div>
        </div>

        <nav className="footer-links">
          <Link to="/">Menu</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/admin">Manage food</Link>
        </nav>

        <p className="footer-note">
          Demo project — no real orders or payments are processed.
        </p>
      </div>
      <div className="footer-bottom">
        <div className="container">
          © {new Date().getFullYear()} Tadka. Built for demonstration purposes.
        </div>
      </div>
    </footer>
  );
}
