     import { useState } from "react";
 
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
 
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setMessage("Please fill in all fields");
      return;
    }
 
    setLoading(true);
 
    try {
      await sendEmail(formData);
      setMessage("Thank you! Your message has been sent.");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
      setSubmitted(false);
    } catch {
      setMessage("Error sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };
 
  const sendEmail = async (data) => {
    console.log("Email would be sent with:", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };
 
  return (
    <form
      onSubmit={handleSubmit}
      className="items-center bg-inherit shadow-xl border-2 border-(--brown-700) rounded-lg p-3 gap-2 mb-5 grid grid-cols-1 md:grid-cols-2 xl:mr-4"
    >
      <h2 className="col-span-1 md:col-span-2 text-center text-2xl font-bold mb-4">
        Send us a message. We'd love to hear from you!
      </h2>
 
      {message && (
        <p className={`col-span-1 md:col-span-2 text-center text-sm font-medium ${
          message.includes("Error") ? "text-red-700" : "text-green-700"
        }`}>
          {message}
        </p>
      )}
 
      <label className="flex flex-col gap-1">
        <span className="text-lg font-medium pl-1">First Name</span>
        <input
          type="text"
          name="firstName"
          id="footer-firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
            submitted && !formData.firstName
              ? "border-red-800 text-red-600"
              : "border-(--taupe)"
          }`}
        />
        {submitted && !formData.firstName && (
          <p className="text-red-700 text-sm">First name is required</p>
        )}
      </label>
 
      <label className="flex flex-col gap-1">
        <span className="text-lg font-medium pl-1">Last Name</span>
        <input
          type="text"
          name="lastName"
          id="footer-lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
            submitted && !formData.lastName
              ? "border-red-800 text-red-600"
              : "border-(--taupe)"
          }`}
        />
        {submitted && !formData.lastName && (
          <p className="text-red-700 text-sm">Last name is required</p>
        )}
      </label>
 
      <label className="flex flex-col gap-1 col-span-1 md:col-span-2">
        <span className="text-lg font-medium pl-1">Email</span>
        <input
          type="email"
          name="email"
          id="footer-email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
            submitted && !formData.email
              ? "border-red-800 text-red-600"
              : "border-(--taupe)"
          }`}
        />
        {submitted && !formData.email && (
          <p className="text-red-700 text-sm">Email is required</p>
        )}
      </label>
 
      <label className="flex flex-col gap-1 col-span-1 md:col-span-2">
        <span className="text-lg font-medium pl-1">Message</span>
        <textarea
          name="message"
          id="footer-message"
          placeholder="Enter your message here."
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className={`bg-(--expresso)/60 p-1.5 rounded-md border focus:bg-(--expresso)/80 ${
            submitted && !formData.message
              ? "border-red-800 text-red-600"
              : "border-(--taupe)"
          }`}
        />
        {submitted && !formData.message && (
          <p className="text-red-700 text-sm">Please enter a message</p>
        )}
      </label>
 
      <button
        type="submit"
        disabled={loading}
        className="col-span-1 text-center md:col-span-2 bg-(--brown-700) text-white p-2 rounded-md hover:bg-(--brown-700)/80 disabled:opacity-50 transition-colors"
      >
        {loading ? "Sending..." : "Submit Message"}
      </button>
    </form>
  );
}
 
 
 
import Badge from "./ui/Badge";
import Card, { CardHeader, CardContent } from "./ui/Card";
import Separator from "./ui/Separator";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ui/ScrollReveal";
import coffeePlants from "../assets/coffee_plants.jpeg";
import storeBarista from "../assets/store_barista.jpeg";
 
const values = [
    {
        icon: "🌍",
        title: "Direct Trade Origins",
        description:
            "We partner directly with small farms in Ethiopia, Colombia, Guatemala, and Indonesia. Every bag is fully traceable to the farm it came from."
    },
    {
        icon: "☕",
        title: "Small-Batch Roasting",
        description:
            "Our master roaster profiles every bean to unlock its peak flavor. We roast in 25-lb batches for consistency and freshness you can taste."
    },
    {
        icon: "🚚",
        title: "Roast-to-Order Shipping",
        description:
            "We don't pre-roast and shelve. Your beans are roasted after you order and shipped within 1-2 business days. Free delivery on orders over $50."
    }
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
 
            {/* Two-column story with image */}
            <div className="about-story-grid">
                <ScrollReveal animation="fadeLeft" className="about-story-text">
                    <p className="about-body lead--light">
                        The Beans Place started in 2012 with one simple belief: great coffee should
                        be accessible to everyone—not just aficionados. We work directly with
                        farming cooperatives across four continents, paying above fair-trade prices
                        to ensure quality from soil to sip.
                    </p>
                    <p className="about-body lead--light">
                        Every week, our roastmaster cups dozens of samples to select only the lots
                        that meet our standard. Whether you prefer a bright, fruity Ethiopian
                        Yirgacheffe or a deep, chocolatey Colombian Supremo, we roast each batch to
                        order so it arrives at peak freshness.
                    </p>
                </ScrollReveal>
 
                <ScrollReveal animation="fadeRight" delay={0.2} className="about-story-images">
                    <div className="about-image-stack">
                        <img
                            src={coffeePlants}
                            alt="Coffee plants on a farm"
                            className="about-image about-image-main"
                        />
                        <img
                            src={storeBarista}
                            alt="Barista crafting coffee"
                            className="about-image about-image-overlay"
                        />
                    </div>
                </ScrollReveal>
            </div>
 
            {/* Value cards */}
            <StaggerContainer staggerDelay={0.15} className="about-cards-grid">
                {values.map((v) => (
                    <StaggerItem key={v.title} animation="fadeUp">
                        <Card glass className="about-value-card">
                            <CardHeader>
                                <span className="about-card-icon">{v.icon}</span>
                                <h3 className="text-lg font-bold text-[var(--cream)]">{v.title}</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm leading-relaxed text-white/70">
                                    {v.description}
                                </p>
                            </CardContent>
                        </Card>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
    );
}
 
 