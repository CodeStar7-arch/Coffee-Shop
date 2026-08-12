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

// Serverless Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Coffee Shop serverless API is working!",
  });
});

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    console.log("Fetching products from database...");

    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log(`Found ${products.length} products`);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);

    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});

// Mount cart routes (requires JWT auth)
app.use("/api/cart", auth, cartRouter);

// Mount order routes (requires JWT auth)
app.use("/api/orders", auth, orderRouter);

export default app;