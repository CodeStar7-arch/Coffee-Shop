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

const row1 = [
  imgJamaicanBlueMountain,
  imgEthiopianHarrar,
  imgGuatemalaAntigua,
  imgTanzaniaPeaberry,
  imgColombianSupremo,
  imgVietnameseRobusta,
  imgKona,
  imgArabianMocha,
  imgKenyaAA,
  imgUrigacheffe,
  imgSumatraMandheling,
  imgPanamaGeisha,
  imgRedSulawesi,
  imgCostaRicaTarrazu,
  imgBrazilianSantos,
];

const row2 = [
  imgKenyaAA,
  imgSumatraMandheling,
  imgVietnameseRobusta,
  imgArabianMocha,
  imgPanamaGeisha,
  imgGuatemalaAntigua,
  imgJamaicanBlueMountain,
  imgColombianSupremo,
  imgUrigacheffe,
  imgTanzaniaPeaberry,
  imgEthiopianHarrar,
  imgKona,
  imgRedSulawesi,
  imgBrazilianSantos,
  imgCostaRicaTarrazu,
];

const row3 = [
  imgGuatemalaAntigua,
  imgJamaicanBlueMountain,
  imgEthiopianHarrar,
  imgKona,
  imgUrigacheffe,
  imgTanzaniaPeaberry,
  imgKenyaAA,
  imgColombianSupremo,
  imgVietnameseRobusta,
  imgSumatraMandheling,
  imgPanamaGeisha,
  imgArabianMocha,
  imgRedSulawesi,
  imgCostaRicaTarrazu,
  imgBrazilianSantos,
];

function ImageRow({ images, offset = 0 }) {
  const doubled = [...images, ...images];

  return (
    <div
      className="carousel-row"
      style={{ transform: `translate3d(${offset}px, 0, 0)` }}
    >
      {doubled.map((src, index) => (
        <div className="carousel-card" key={index}>
          <img
            src={src}
            alt={`Coffee Bag ${(index % images.length) + 1}`}
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
        <ImageRow images={row1} offset={offsets[0]} />
        <ImageRow images={row2} offset={offsets[1]} />
        <ImageRow images={row3} offset={offsets[2]} />
      </div>
    </section>
  );
}