import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroBeans from "../assets/hero-beans.png";
import Button from "./ui/Button";
import Badge from "./ui/Badge";
 
const textVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};
 
const wordVariant = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};
 
export default function HeroSection() {
    const { scrollY } = useScroll();
    const imgScale = useTransform(scrollY, [0, 600], [1.35, 0.9]);
    const imgOpacity = useTransform(scrollY, [0, 500], [1, 0]);
    const imgY = useTransform(scrollY, [0, 600], [0, 100]);
 
    return (
        <>
            {/* LEFT — Text */}
            <div id="home" className="hero-text-column">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}>
                    <Badge variant="outline" className="mb-5">
                        ✦ Premium Coffee Beans — Roasted Fresh Daily
                    </Badge>
                </motion.div>
 
                <motion.h1
                    className="h1-stack"
                    style={{ margin: 0, perspective: "600px" }}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible">
                    <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                        YOUR PLACE
                    </motion.span>
                    <br />
                    <motion.span
                        variants={wordVariant}
                        className="muted"
                        style={{ display: "inline-block" }}>
                        FOR COFFEE
                    </motion.span>
                    <br />
                    <motion.span variants={wordVariant} style={{ display: "inline-block" }}>
                        BREWING
                    </motion.span>
                </motion.h1>
 
                <motion.p
                    className="lead"
                    style={{ marginTop: 18 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}>
                    Farm-to-cup single-origin beans from Ethiopia, Colombia & beyond. Freshly
                    roasted in small batches and shipped to your door within 48 hours.
                </motion.p>
 
                <motion.div
                    className="hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}>
                    <Button
                        variant="accent"
                        size="lg"
                        className="shadow-lg"
                        onClick={() =>
                            document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })
                        }>
                        SHOP COFFEE ☕
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() =>
                            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                        }>
                        OUR STORY
                    </Button>
                </motion.div>
 
                {/* Trust indicators */}
                <motion.div
                    className="hero-trust"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}>
                    <span>★★★★★ 4.9/5 from 2,400+ customers</span>
                    <span className="hero-trust-divider">|</span>
                    <span>Free shipping over $50</span>
                </motion.div>
            </div>
 
            {/* RIGHT — Hero beans image */}
            <div className="hero-art-container">
                <motion.img
                    className="hero-art"
                    src={heroBeans}
                    alt="Premium coffee beans"
                    style={{
                        scale: imgScale,
                        opacity: imgOpacity,
                        y: imgY
                    }}
                    initial={{ opacity: 0, scale: 0.8, x: 60 }}
                    animate={{ opacity: 1, scale: 1.35, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
 
                {/* Floating price badge */}
                <motion.div
                    className="hero-floating-badge"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.5,
                        delay: 1.2,
                        type: "spring",
                        stiffness: 200
                    }}>
                    <span className="hero-floating-badge-label">FROM</span>
                    <span className="hero-floating-badge-price">$14.99</span>
                    <span className="hero-floating-badge-label">per bag</span>
                </motion.div>
            </div>
        </>
    );
}