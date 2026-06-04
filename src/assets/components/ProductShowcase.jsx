import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./uiScrollReveal";
import Badge from "./ui/Badge";
import Button from "./ui/Button";
import Seperator from "./ui/Seperator";

import imgEthiopianHarrar from "../assets/Ethiopian-Harrar-Bag.png";
import imgColumbianSupremo from "../assets/Columbian-Supremo-Bag.png";
import imgKenyaAA from "../assets/Kenya-AA-Bag.png";
import imgPanamaGeisha from "../assets/Panama-Geisha.png";
import imgKona from "../assets/Kona-Bag.png";
import imgGuatemalaAntigua from "../assets/Guatemala-Antigua-Bag.png";

const products = [
    {
        name: "Ethiopian Harrar",
        origin: "Ethiopia",
        price: "$18.99",
        roast: "Medium",
        notes: "Blueberry, dark chocolate, wine",
        image: imgEthiopianHarrar,
        badge: "Best Seller"
    },
    {
        name: "Columbian supremo",
        origin: "Columbia",
        price: "$16.99",
        roast: "Medium-Dark",
        notes: "Carmel, nutty, smooth finish",
        image: imgColumbianSupremo,
        badge: null
    },
    {
        name: "Kenya AA",
        origin: "Kenya",
        price: "$21.99"
        roast: "Light",
        notes: "Bright citrus, black currant, floral",
        image: imgKenyaAA,
        badge: "Staff Pick"
    },
    {
        name: "Panama Geisha",
        origin: "Panama",
        price: "$34.99"
        roast: "Light"
        notes: "Jasmine, bergamot, tropical fruit",
        image: imgPanamaGeisha,
        badge: "Limited"
    },
    {
        name: "Kona",
        origin: "Hawaii",
        price: "29.99",
        roast: "Medium",
        notes: "Brown sugar, macadamia, mild acidity",
        image: imgKona,
        badge: null
    },
    {
        name: "Guatemala Antigua",
        origin: "Guatemal",
        price: "$17.99"
        roast: "Dark",
        notes: "Cocoa, spice, smoky sweetness",
        image: imgGuatemalaAntigua,
        badge: "New"
    }
];

export default function ProductShowcase() {
    return (
        <div className="product-showcase">
        <ScrollReveal animation="fadeUp" delay={0.1}>
    <h2 className="product-showcase-title">
        Shop Our
        <br />
        <span className="muted">Finest Beans</span>

    </h2>
        </ScrollReveal>

        <ScrollReveal>

        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.15}>
        <Seperator className="mx-auto mb-4 max-w-48" />
        </ScrollReveal>

        <ScrollReveal animation="fadeUp" delay={0.15}>
         <p className="product-showcase-subtitle">
            Hand-selected single-origin coffees, roasted to order. Each bag ships within 48 hours of roasting for maximum freshness.

         </p>

        </ScrollReveal>

        <StaggerContainer staggerDelay={0.1} className="product-grid">
        {products.map((product) => (
            <StaggerItem key={product.name} animation="fadeUp">
                <motion.div 
                className="product"
                whileHover={{ y: -8, transition: { duration: 0.25 } }}>
                <div className="product-card-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.badge && (
                    <span classname="product-badge"></span>
                )}

                </div>

                <div className="product-card-info">
                <div className="product-card-header"> 
                <h3>{product.name}</h3>
                <span className="product-price">{product.price}</span>

                </div>

                <p className="product-origin">
                {product.origin} . {product.roast} Roast

                </p>
                <p className="product-note">{product.notes}</p>
                <Button variant="primary" size="sm" className="w-full mt-3">
                Add to Cart

                </Button>

                </div>
                
                </motion.div>
            </StaggerItem>
        ))}

        </StaggerContainer>

        <ScrollReveal animation="fadeUp" delay={0.2}>
        <div className="product-showcase-cta">
        <Button variant="accent" size="lg">
        View All Coffee →

        </Button>

        </div>

        </ScrollReveal>

        </div>
    );
}