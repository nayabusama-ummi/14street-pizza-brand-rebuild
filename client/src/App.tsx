import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { SearchModal } from "./components/SearchModal";
import { QuickViewModal } from "./components/QuickViewModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { MenuPage } from "./pages/MenuPage";
import { PizzaCustomizerPage } from "./pages/PizzaCustomizerPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage";
import { LetsScrollOdysseyPage } from "./pages/LetsScrollOdysseyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-charcoal-950 text-cream-100 selection:bg-pizza-red selection:text-white relative">
          
          {/* Header */}
          <Navbar />
          
          {/* Global Slide-Over Cart Drawer */}
          <CartDrawer />

          {/* Global Quick Search Modal (Cmd+K / Ctrl+K) */}
          <SearchModal />

          {/* Global Quick View & Customize Modal */}
          <QuickViewModal />

          {/* Main App Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/pizza/:id" element={<PizzaCustomizerPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/odyssey" element={<LetsScrollOdysseyPage />} />
              <Route path="/lets-scroll" element={<LetsScrollOdysseyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />
          
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
