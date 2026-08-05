import Badge from "./ui/Badge";
import Card, { CardHeader, CardContent } from "./ui/Card";
import Separator from "./ui/Separator";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "./ui/ScrollReveal";

const coffeePlantsImage = "/images/coffee_plants.jpeg";
const storeBaristaImage = "/images/store_barista.jpeg";

const values = [
  {
    icon: "🌍",
    title: "Direct Trade Origins",
    description:
      "We partner directly with small farms in Ethiopia, Colombia, Guatemala, and Indonesia. Every bag is fully traceable to the farm it came from.",
  },
  {
    icon: "☕",
    title: "Small-Batch Roasting",
    description:
      "Our master roaster profiles every bean to unlock its peak flavor. We roast in 25-lb batches for consistency and freshness you can taste.",
  },
  {
    icon: "🚚",
    title: "Roast-to-Order Shipping",
    description:
      "We don't pre-roast and shelve. Your beans are roasted after you order and shipped within 1-2 business days. Free delivery on orders over $50.",
  },
];

export default function AboutSection() {
  return (
    <div className="about-content">
      <ScrollReveal animation="fadeUp">
        <Badge variant="default" className="mb-4">
          Founded 2012 · Roasting in-house since day one
        </Badge>
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.1}>
        <h1>
          <span className="muted">OUR STORY</span>
        </h1>
      </ScrollReveal>

      <ScrollReveal animation="fadeIn" delay={0.2}>
        <Separator className="mb-8 max-w-64" />
      </ScrollReveal>

      {/* Story Section */}
      <div className="about-story-grid">
        <ScrollReveal
          animation="fadeLeft"
          className="about-story-text"
        >
          <p className="about-body lead--light">
            The Beans Place started in 2012 with one simple belief:
            great coffee should be accessible to everyone—not just
            aficionados. We work directly with farming cooperatives
            across four continents, paying above fair-trade prices to
            ensure quality from soil to sip.
          </p>

          <p className="about-body lead--light">
            Every week, our roastmaster cups dozens of samples to
            select only the lots that meet our standard. Whether you
            prefer a bright, fruity Ethiopian Yirgacheffe or a deep,
            chocolatey Colombian Supremo, we roast each batch to order
            so it arrives at peak freshness.
          </p>
        </ScrollReveal>

        <ScrollReveal
          animation="fadeRight"
          delay={0.2}
          className="about-story-images"
        >
          <div className="about-image-stack">
            <img
              src={coffeePlantsImage}
              alt="Coffee plants on a farm"
              className="about-image about-image-main"
            />

            <img
              src={storeBaristaImage}
              alt="Barista crafting coffee"
              className="about-image about-image-overlay"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Value Cards */}
      <StaggerContainer
        staggerDelay={0.15}
        className="about-cards-grid"
      >
        {values.map((value) => (
          <StaggerItem key={value.title} animation="fadeUp">
            <Card glass className="about-value-card">
              <CardHeader>
                <span className="about-card-icon">
                  {value.icon}
                </span>

                <h3 className="text-lg font-bold text-[var(--cream)]">
                  {value.title}
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm leading-relaxed text-white/70">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}