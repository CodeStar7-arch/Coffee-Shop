import RibbonTicker from "./components/RibbonTicker";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import CtaSection from "./componentsCtaSection";
import FeatureSection from "./components/FeatureSection";
import ProductShowcase from "./components/ProductShowcase";
import FooterSection from "./components/FooterSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="app">
    {/* NAVBAR */}
    <NavBar />

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
