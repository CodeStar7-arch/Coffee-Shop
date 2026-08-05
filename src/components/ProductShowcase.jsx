import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "./ui/ScrollReveal";
import Button from "./ui/Button";
import Separator from "./ui/Separator";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductShowcase() {
  const { addToCart, loading: cartLoading } = useCart();
  const { isAuthenticated } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}`
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(
          "Unable to load our coffee selection. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      alert("Please login first to add items to cart");
      return;
    }

    setAddingId(product.id);
    try {
      await addToCart(product);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    } finally {
      setAddingId(null);
    }
  };


  return (
    <section
      id="shop"
      className="product-showcase"
    >
      <ScrollReveal animation="fadeUp" delay={0.1}>
        <h2 className="product-showcase-title">
          Shop Our
          <br />
          <span className="muted">
            Finest Beans
          </span>
        </h2>
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.15}>
        <Separator className="mx-auto mb-4 max-w-48" />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.15}>
        <p className="product-showcase-subtitle">
          Hand-selected single-origin coffees,
          roasted to order. Every bag ships within
          48 hours of roasting for maximum
          freshness.
        </p>
      </ScrollReveal>

      {/* Loading */}

      {loading && (
        <div className="py-20 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="mx-auto mb-6 h-12 w-12 rounded-full border-4 border-[var(--amber)] border-t-transparent"
          />

          <p className="text-lg text-white/70">
            Loading our freshest coffee beans...
          </p>
        </div>
      )}

      {/* Error */}

      {!loading && error && (
        <div className="py-20 text-center">
          <h3 className="mb-3 text-2xl font-bold text-red-400">
            Oops!
          </h3>

          <p className="text-white/70">
            {error}
          </p>

          <Button
            className="mt-6"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Empty State */}

      {!loading &&
        !error &&
        products.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="mb-3 text-2xl font-bold">
              No Coffee Available
            </h3>

            <p className="text-white/70">
              We're roasting a fresh batch.
              Check back soon!
            </p>
          </div>
        )}

      {/* Products */}

      {!loading &&
        !error &&
        products.length > 0 && (
          <StaggerContainer
            staggerDelay={0.1}
            className="product-grid"
          >
            {products.map((product) => {
              const productId = `product-${product.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")}`;

              return (
                <StaggerItem
                  key={product.id}
                  animation="fadeUp"
                >
                  <motion.div
                    id={productId}
                    className="product-card"
                    whileHover={{
                      y: -8,
                      transition: {
                        duration: 0.25,
                      },
                    }}
                  >
                  <div className="product-card-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />

                    {product.featured && (
                      <span className="product-badge">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="product-card-info">
                    <div className="product-card-header">
                      <h3>
                        {product.name}
                      </h3>

                      <span className="product-price">
                        $
                        {Number(
                          product.price
                        ).toFixed(2)}
                      </span>
                    </div>

                    <p className="product-origin">
                      {product.category}
                    </p>

                    <p className="product-note">
                      {product.description}
                    </p>

                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full mt-3"
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      disabled={addingId === product.id || cartLoading}
                    >
                      {addingId === product.id ? "Adding..." : "Add to Cart"}
                    </Button>
                  </div>
                </motion.div>
              </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}

      <ScrollReveal
        animation="fadeUp"
        delay={0.2}
      >
        <div className="product-showcase-cta">
          <Button
            variant="accent"
            size="lg"
          >
            View All Coffee →
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}