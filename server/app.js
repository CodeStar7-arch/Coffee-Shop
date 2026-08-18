import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
import auth from "./middleware/auth.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

const app = express();

// Whitelist allowed origins (Portfolio domain + Local Development)
const allowedOrigins = [
  "https://adamgarcia.dev",
  "https://www.adamgarcia.dev",
  "http://localhost:3000",
  "http://localhost:5173" // Default Vite port if applicable
];

// CORS Middleware Configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like server-to-server or Postman/curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation: Access denied for this origin."));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Root / Health Check Route
app.get("/", (req, res) => {
  res.json({
    message: "☕ Coffee Shop API is running!",
  });
});

// Helper function to handle routes both with and without the /api prefix
const handleProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
};

// Mount product route for both /api/products and /products (handles Vercel route rewrites)
app.get("/api/products", handleProducts);
app.get("/products", handleProducts);

// Mount cart routes (requires JWT auth)
app.use("/api/cart", auth, cartRouter);
app.use("/cart", auth, cartRouter);

// Mount order routes (requires JWT auth)
app.use("/api/orders", auth, orderRouter);
app.use("/orders", auth, orderRouter);

export default app;