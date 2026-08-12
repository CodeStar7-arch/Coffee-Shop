import { useEffect, useRef, useState } from "react";

const imgRedSulawesi = "/images/Red-Sulawesi-Bag.png";
const imgUrigacheffe = "/images/Urigacheffe-Bag.png";
const imgTanzaniaPeaberry = "/images/Tanzania-Peaberry-Bag.png";
const imgPanamaGeisha = "/images/Panama-Geisha.png";
const imgVietnameseRobusta = "/images/Vietnamese-Robusta.png";
const imgBrazilianSantos = "/images/Brazilian-Santos-Bag.png";
const imgCostaRicaTarrazu = "/images/Costa-Rica-Tarrazu-Bag.png";
const imgGuatemalaAntigua = "/images/Guatemala-Antigua-Bag.png";
const imgKenyaAA = "/images/Kenya-AA-Bag.png";
const imgSumatraMandheling = "/images/Sumatra-Mandheling-Bag.png";
const imgKona = "/images/Kona-Bag.png";
const imgJamaicanBlueMountain = "/images/Jamaican-Blue-Mountain-Bag.png";
const imgColombianSupremo = "/images/Colombian-Supremo-Bag.png";
const imgEthiopianHarrar = "/images/Ethiopian-Harrar-Bag.png";
const imgArabianMocha = "/images/Arabian-Mocha-Bag.png";

const productImages = {
  "Brazilian Santos": imgBrazilianSantos,
  "Colombian Supremo": imgColombianSupremo,
  "Ethiopian Harrar": imgEthiopianHarrar,
  "Sumatra Mandheling": imgSumatraMandheling,
  "Red Sulawesi": imgRedSulawesi,
  "Urigacheffe": imgUrigacheffe,
  "Tanzania Peaberry": imgTanzaniaPeaberry,
  "Panama Geisha": imgPanamaGeisha,
  "Vietnamese Robusta": imgVietnameseRobusta,
  "Costa Rica Tarrazu": imgCostaRicaTarrazu,
  "Guatemala Antigua": imgGuatemalaAntigua,
  "Kenya AA": imgKenyaAA,
  "Kona": imgKona,
  "Jamaican Blue Mountain": imgJamaicanBlueMountain,
  "Arabian Mocha": imgArabianMocha,
};

const row1 = [
  "Jamaican Blue Mountain",
  "Ethiopian Harrar",
  "Guatemala Antigua",
  "Tanzania Peaberry",
  "Colombian Supremo",
  "Vietnamese Robusta",
  "Kona",
  "Arabian Mocha",
  "Kenya AA",
  "Urigacheffe",
  "Sumatra Mandheling",
  "Panama Geisha",
  "Red Sulawesi",
  "Costa Rica Tarrazu",
  "Brazilian Santos",
];

const row2 = [
  "Kenya AA",
  "Sumatra Mandheling",
  "Vietnamese Robusta",
  "Arabian Mocha",
  "Panama Geisha",
  "Guatemala Antigua",
  "Jamaican Blue Mountain",
  "Colombian Supremo",
  "Urigacheffe",
  "Tanzania Peaberry",
  "Ethiopian Harrar",
  "Kona",
  "Red Sulawesi",
  "Brazilian Santos",
  "Costa Rica Tarrazu",
];

const row3 = [
  "Guatemala Antigua",
  "Jamaican Blue Mountain",
  "Ethiopian Harrar",
  "Kona",
  "Urigacheffe",
  "Tanzania Peaberry",
  "Kenya AA",
  "Colombian Supremo",
  "Vietnamese Robusta",
  "Sumatra Mandheling",
  "Panama Geisha",
  "Arabian Mocha",
  "Red Sulawesi",
  "Costa Rica Tarrazu",
  "Brazilian Santos",
];

const slugify = (value) =>
  `product-${value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

const scrollToProduct = (name) => {
  const productId = slugify(name);
  const target = document.getElementById(productId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  window.location.hash = "#/home";
  setTimeout(() => {
    document.getElementById(productId)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 150);
};

function ImageRow({ images, offset = 0, onItemClick }) {
  const doubled = [...images, ...images];

  return (
    <div
      className="carousel-row"
      style={{ transform: `translate3d(${offset}px, 0, 0)` }}
    >
      {doubled.map((name, index) => (
        <div
          className="carousel-card"
          key={`${name}-${index}`}
          onClick={() => onItemClick(name)}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onItemClick(name);
            }
          }}
        >
          <img
            src={productImages[name]}
            alt={name}
            className="carousel-image"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export default function FeaturesSection() {
  const sectionRef = useRef(null);
  const [offsets, setOffsets] = useState([0, 0, 0]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      const progress = 1 - rect.bottom / (viewHeight + rect.height);
      const p = Math.max(0, Math.min(1, progress));

      const range = 600;

      setOffsets([
        -p * range,
        p * range - range,
        -p * range * 0.7,
      ]);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="carousel-gallery-section"
      ref={sectionRef}
    >
      <div className="carousel-gallery-container">
        <ImageRow images={row1} offset={offsets[0]} onItemClick={scrollToProduct} />
        <ImageRow images={row2} offset={offsets[1]} onItemClick={scrollToProduct} />
        <ImageRow images={row3} offset={offsets[2]} onItemClick={scrollToProduct} />
      </div>
    </section>
  );
}