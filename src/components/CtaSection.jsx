import Button from "./ui/Button";
import Badge from "./ui/Badge";
import Separator from "./ui/Separator";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import AnimatedCounter from "./ui/AnimatedCounter";
 
const perks = [
    { icon: "🌱", label: "Ethically Sourced" },
    { icon: "🔥", label: "Freshly Roasted" },
    { icon: "🚚", label: "Free Shipping $50+" },
    { icon: "♻️", label: "Eco-Friendly Bags" }
];
 
export default function CtaSection() {
    return (
        <div className="cta-section">
            <ScrollReveal animation="fadeUp" delay={0}>
                <Badge variant="accent" className="mb-6">
                    ☕ Fresh Roasts Daily
                </Badge>
            </ScrollReveal>
 
            <ScrollReveal animation="fadeUp" delay={0.1}>
                <h2>
                    Brewed With Passion,
                    <br />
                    Delivered Fresh
                </h2>
            </ScrollReveal>
 
            <ScrollReveal animation="fadeIn" delay={0.2}>
                <Separator className="mx-auto mb-6 max-w-48" />
            </ScrollReveal>
 
            <ScrollReveal animation="fadeUp" delay={0.2}>
                <p className="cta-subtitle">
                    Skip the line. Order premium single-origin coffee online and get it roasted to
                    order. From our roastery to your doorstep in 1-2 business days.
                </p>
            </ScrollReveal>
 
            {/* Perks grid */}
            <StaggerContainer staggerDelay={0.1} className="cta-perks">
                {perks.map((perk) => (
                    <StaggerItem key={perk.label} animation="scaleUp" className="cta-perk-item">
                        <span className="cta-perk-icon">{perk.icon}</span>
                        <span className="cta-perk-label">{perk.label}</span>
                    </StaggerItem>
                ))}
            </StaggerContainer>
 
            <ScrollReveal animation="fadeUp" delay={0.15}>
                <div className="cta-buttons">
                    <Button variant="accent" size="lg">
                        Order Now ☕
                    </Button>
                    <Button variant="ghost" size="lg">
                        View Full Menu
                    </Button>
                </div>
            </ScrollReveal>
 
            {/* Stats bar */}
            <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="cta-stats">
                    <div className="cta-stat">
                        <span className="cta-stat-number">
                            <AnimatedCounter target={15} suffix="+" />
                        </span>
                        <span className="cta-stat-label">Origins</span>
                    </div>
                    <div className="cta-stat-divider" />
                    <div className="cta-stat">
                        <span className="cta-stat-number">
                            <AnimatedCounter target={2400} suffix="+" />
                        </span>
                        <span className="cta-stat-label">Happy Customers</span>
                    </div>
                    <div className="cta-stat-divider" />
                    <div className="cta-stat">
                        <span className="cta-stat-number">
                            <AnimatedCounter target={48} suffix="hr" />
                        </span>
                        <span className="cta-stat-label">Fresh Delivery</span>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}