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
app.get("/api/products", (req, res) => {
  console.log("API route reached!");
  res.json([
    {
      id: 1,
      name: "Test Coffee",
      price: 9.99
    }
  ]);
});

// Mount cart routes (requires JWT auth)
app.use("/api/cart", auth, cartRouter);

// Mount order routes (requires JWT auth)
app.use("/api/orders", auth, orderRouter);

export default app;
