import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ToastProvider } from "./context/ToastContext";
import { Navbar } from "./components/Navbar/Navbar";
import { Footer } from "./components/Footer/Footer";
import { CartDrawer } from "./components/Cart/CartDrawer";
import { CheckoutModal } from "./components/Checkout/CheckoutModal";
import { Home } from "./pages/Home";
import { Admin } from "./pages/Admin";
import { Favorites } from "./pages/Favorites";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <ToastProvider>
      <FavoritesProvider>
        <CartProvider>
          <Navbar onCartClick={() => setCartOpen(true)} />

          <main style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>

          <Footer />

          <CartDrawer
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            onCheckout={openCheckout}
          />

          {checkoutOpen && (
            <CheckoutModal onClose={() => setCheckoutOpen(false)} />
          )}
        </CartProvider>
      </FavoritesProvider>
    </ToastProvider>
  );
}
