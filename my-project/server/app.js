import express from "express";
import cors from "cors";
import prisma from "./prisma.js";
import auth from "./middleware/auth.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "☕ Coffee Shop API is running!",
  });
});

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Unable to fetch products" });
  }
});

// Mount cart routes (requires JWT auth)
app.use("/api/cart", auth, cartRouter);

// Mount order routes (requires JWT auth)
app.use("/api/orders", auth, orderRouter);

export default app;
