import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ui/ScrollReveal";
import Separator from "./ui/Separator";
 
const contactChannels = [
    {
        name: "Visit Our Roastery",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-7 h-7">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
            </svg>
        ),
        gradient: "from-amber-700 to-amber-500",
        shadowColor: "rgba(212, 146, 42, 0.45)",
        detail: "Beans Place\nStrasburg, CO 80136",
        action: "Get Directions",
        href: "https://maps.google.com/?q=Beans+Place+Strasburg+CO"
    },
    {
        name: "Opening Hours",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-7 h-7">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        gradient: "from-yellow-700 to-yellow-500",
        shadowColor: "rgba(202, 138, 4, 0.45)",
        detail: "Mon – Fri: 7am – 6pm\nSat – Sun: 8am – 4pm",
        action: "Plan Your Visit",
        href: "#contact"
    },
    {
        name: "Email Us",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-7 h-7">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
            </svg>
        ),
        gradient: "from-orange-700 to-orange-500",
        shadowColor: "rgba(194, 65, 12, 0.4)",
        detail: "hello@thebeansplace.com\nWe respond within 24 hours",
        action: "Send Email",
        href: "mailto:hello@thebeansplace.com"
    },
    {
        name: "Call Us",
        icon: (
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="w-7 h-7">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
            </svg>
        ),
        gradient: "from-stone-700 to-stone-500",
        shadowColor: "rgba(120, 113, 108, 0.45)",
        detail: "(303) 555-BEAN\nWholesale: (303) 555-BULK",
        action: "Call Now",
        href: "tel:+13035552326"
    },
    {
        name: "Instagram",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
            </svg>
        ),
        gradient: "from-pink-700 via-rose-600 to-orange-500",
        shadowColor: "rgba(219, 39, 119, 0.4)",
        detail: "@thebeansplace\nBehind-the-scenes & latte art",
        action: "Follow Us",
        href: "https://instagram.com"
    },
    {
        name: "Facebook",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
        ),
        gradient: "from-blue-700 to-blue-500",
        shadowColor: "rgba(37, 99, 235, 0.4)",
        detail: "The Beans Place\nEvents, deals & community",
        action: "Like Us",
        href: "https://facebook.com"
    }
];
 
export default function ContactSection() {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
 
    useEffect(() => {
        const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);
 
    return (
        <div className="contact-section-wrap">
            {/* Background effects */}
            <div className="contact-bg-effects">
                <div className="contact-bg-orb contact-bg-orb--1" />
                <div className="contact-bg-orb contact-bg-orb--2" />
                <div className="contact-bg-grid" />
            </div>
 
            <div className="contact-inner">
                {/* Header */}
                <ScrollReveal animation="fadeUp" className="contact-header">
                    <motion.div
                        className="contact-pill"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}>
                        <span>✦ Connect & Collaborate</span>
                    </motion.div>
 
                    <h1 className="h1-stack" style={{ color: "var(--cream)" }}>
                        GET IN
                        <br />
                        <span className="muted" style={{ color: "var(--amber)" }}>
                            TOUCH
                        </span>
                    </h1>
 
                    <p
                        className="lead--light"
                        style={{ maxWidth: "48ch", margin: "10px auto 0", fontSize: 16 }}>
                        Whether you're ordering beans, planning an event, or just want to say hello
                        — we'd love to hear from you.
                    </p>
 
                    <Separator className="mt-4 mb-2 mx-auto max-w-48" />
                </ScrollReveal>
 
                {/* Cards Grid */}
                <motion.div
                    className="contact-cards-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                    {contactChannels.map((channel, index) => (
                        <motion.a
                            key={channel.name}
                            href={channel.href}
                            target={channel.href.startsWith("http") ? "_blank" : undefined}
                            rel={
                                channel.href.startsWith("http") ? "noopener noreferrer" : undefined
                            }
                            className="contact-card-link"
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}>
                            <div className="contact-card">
                                {/* Hover gradient overlay */}
                                <div
                                    className={`contact-card-gradient bg-gradient-to-br ${channel.gradient}`}
                                    style={{ opacity: hoveredIndex === index ? 0.12 : 0 }}
                                />
 
                                {/* Glow */}
                                <div
                                    className="contact-card-glow"
                                    style={{
                                        background: `radial-gradient(circle at 50% 50%, ${channel.shadowColor}, transparent 70%)`,
                                        opacity: hoveredIndex === index ? 1 : 0
                                    }}
                                />
 
                                {/* Content */}
                                <div className="contact-card-content">
                                    <div
                                        className={`contact-card-icon bg-gradient-to-br ${channel.gradient}`}>
                                        {channel.icon}
                                    </div>
 
                                    <h3 className="contact-card-title">{channel.name}</h3>
                                    <p className="contact-card-detail">
                                        {channel.detail.split("\n").map((line, i) => (
                                            <span key={i}>
                                                {line}
                                                {i === 0 && <br />}
                                            </span>
                                        ))}
                                    </p>
 
                                    <div className="contact-card-action">
                                        <span>{channel.action}</span>
                                        <svg
                                            className="w-4 h-4 ml-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    </div>
                                </div>
 
                                {/* Shimmer */}
                                <div className="contact-card-shimmer" />
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
 
            {/* Mouse follow glow */}
            <div
                className="contact-mouse-glow"
                style={{
                    left: `${mousePos.x - 192}px`,
                    top: `${mousePos.y - 192}px`
                }}
            />
        </div>
    );
}