import { useState, useEffect } from "react";
import RibbonTicker from "./components/RibbonTicker";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CtaSection from "./components/CtaSection";
import FeatureSection from "./components/FeatureSection";
import ProductShowcase from "./components/ProductShowcase";
import FooterSection from "./components/FooterSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import CartPage from "./components/CartPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(() =>
    window.location.hash === "#/cart" ? "cart" : "home"
  );

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(
        window.location.hash === "#/cart" ? "cart" : "home"
      );
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateTo = (page) => {
    if (page === "cart") {
      window.location.hash = "#/cart";
      setCurrentPage("cart");
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    window.location.hash = "#/home";
    setCurrentPage("home");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  if (currentPage === "cart") {
    return (
      <div className="app">
        <NavBar onNavigate={navigateTo} />
        <CartPage onNavigate={navigateTo} />
        <section className="bg-footer">
          <FooterSection />
        </section>
      </div>
    );
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <NavBar onNavigate={navigateTo} />

      {/* HERO */}
      <section className="hero bg-hero">
        <div className="hero-grid">
          <HeroSection />
        </div>
      </section>

      <RibbonTicker />

      {/* FEATURES / CAROUSEL */}
      <section className="features bg-features" id="shop">
        <FeatureSection />
      </section>

      {/* PRODUCT SHOWCASE */}
      <section className="bg-cta">
        <ProductShowcase />
      </section>

      <RibbonTicker />

      {/* CTA */}
      <section className="bg-cta">
        <CtaSection />
      </section>

      {/* About */}
      <section className="bg-cta" id="about">
        <AboutSection />
      </section>

      {/* CONTACT */}
      <section className="bg-cta" id="contact">
        <ContactSection />
      </section>

      {/* FOOTER */}
      <section className="bg-footer">
        <FooterSection />
      </section>
    </div>
  );
}
