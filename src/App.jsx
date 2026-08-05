import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState("home");

  if (currentPage === "cart") {
    return (
      <div className="app">
        <NavBar onNavigate={setCurrentPage} />
        <CartPage />
        <section className="bg-footer">
          <FooterSection />
        </section>
      </div>
    );
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <NavBar onNavigate={setCurrentPage} />

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
