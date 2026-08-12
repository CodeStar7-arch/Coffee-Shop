import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

// Create order from cart
router.post("/", async (req, res) => {
  const userId = req.user.id;
  const { customerName, customerEmail, customerPhone, shippingAddress, city, postalCode } = req.body;

  // Validate required fields
  if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !city || !postalCode) {
    return res.status(400).json({ error: "Missing required checkout fields" });
  }

  try {
    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total price
    const totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        city,
        postalCode,
        totalPrice,
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });

    // Clear the cart after successful order
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create order" });
  }
});

// Get all orders for user
router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch orders" });
  }
});

// Get single order
router.get("/:orderId", async (req, res) => {
  const userId = req.user.id;
  const orderId = Number(req.params.orderId);

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.userId !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch order" });
  }
});

export default router;
