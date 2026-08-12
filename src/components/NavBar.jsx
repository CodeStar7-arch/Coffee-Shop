import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

import Button from "./ui/Button";
import AuthLogin from "./AuthLogin";
import { useCart } from "../context/CartContext";

const logo = "/images/Beans_logo.png";

export default function NavBar({ onNavigate = () => {} }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { totalItems } = useCart();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCartClick = () => {
    onNavigate("cart");
  };

  const handleNavigateHome = () => {
    onNavigate("home");
    closeMenu();
  };

  return (
    <motion.header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}

        <a href="#home" className="brand">
          <img
            src={logo}
            alt="Beans Place Logo"
            className="logo h-12 w-auto md:h-14"
          />
        </a>

        {/* Desktop Navigation */}

        <nav className="nav-links hidden items-center gap-10 md:flex">
          <button type="button" onClick={handleNavigateHome}>Home</button>

          <button type="button" onClick={() => onNavigate("home")}>Shop Coffee</button>

          <button type="button" onClick={() => {
            onNavigate("home");
            setTimeout(() => {
              document.getElementById("about")?.scrollIntoView({
                behavior: "smooth",
              });
            }, 50);
          }}>
            Our Story
          </button>

          <button type="button" onClick={() => {
            onNavigate("home");
            setTimeout(() => {
              document.getElementById("contact")?.scrollIntoView({
                behavior: "smooth",
              });
            }, 50);
          }}>
            Contact
          </button>
        </nav>

        {/* Desktop Right Side */}

        <div className="hidden items-center gap-5 md:flex">
          {/* Auth Login */}
          <AuthLogin />

          {/* Shopping Cart */}

          <button
            onClick={handleCartClick}
            className={`relative transition-transform hover:scale-110 ${
              totalItems > 0
                ? "ring-2 ring-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.25)]"
                : ""
            }`}
            aria-label="Shopping Cart"
          >
            <FaShoppingCart
              size={24}
              className={`transition ${
                totalItems > 0
                  ? "text-[var(--amber-dark)]"
                  : "text-[var(--cream)]"
              }`}
            />

            {totalItems > 0 && (
              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-6
                  w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-[var(--amber)]
                  text-xs
                  font-bold
                  text-black
                  animate-pulse
                "
              >
                {totalItems}
              </span>
            )}
          </button>

          <Button
            variant="accent"
            size="sm"
            onClick={() => {
              onNavigate("home");
              setTimeout(() => {
                document.getElementById("shop")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 50);
            }}
          >
            Order Now ☕
          </Button>
        </div>

        {/* Mobile Hamburger */}

        <button
          type="button"
          aria-label={
            menuOpen ? "Close Menu" : "Open Menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen
                ? "translate-y-2 rotate-45"
                : ""
            }`}
          />

          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen
                ? "-translate-y-2 -rotate-45"
                : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="overflow-hidden md:hidden"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <nav className="flex flex-col gap-5 px-6 pb-6 pt-2">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onNavigate("home");
                }}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onNavigate("home");
                  setTimeout(() => {
                    document.getElementById("shop")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 50);
                }}
              >
                Shop Coffee
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onNavigate("home");
                  setTimeout(() => {
                    document.getElementById("about")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 50);
                }}
              >
                Our Story
              </button>

              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  onNavigate("home");
                  setTimeout(() => {
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }, 50);
                }}
              >
                Contact
              </button>

              <div className="flex items-center justify-between pt-4">
                <div className="relative">
                  <FaShoppingCart
                    size={24}
                    className="text-[var(--cream)]"
                  />

                  {totalItems > 0 && (
                    <span
                      className="
                        absolute
                        -right-2
                        -top-2
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--amber)]
                        text-xs
                        font-bold
                        text-black
                      "
                    >
                      {totalItems}
                    </span>
                  )}
                </div>

                <Button
                  variant="accent"
                  size="sm"
                  onClick={() => {
                    closeMenu();
                    onNavigate("home");
                    setTimeout(() => {
                      document.getElementById("shop")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 50);
                  }}
                >
                  Order Now ☕
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}