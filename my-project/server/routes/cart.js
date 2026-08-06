import express from "express";
import prisma from "../prisma.js";

const router = express.Router();

async function ensureUserExists(userId) {
  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId },
  });
}

// Get current user's cart
router.get("/", async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } },
    });

    if (!cart) {
      return res.json({ items: [], totalItems: 0, totalPrice: 0 });
    }

    const totalItems = cart.items.reduce((s, i) => s + i.quantity, 0);
    const totalPrice = cart.items.reduce((s, i) => s + i.quantity * i.price, 0);

    res.json({ ...cart, totalItems, totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch cart" });
  }
});

// Add product to cart
router.post("/add", async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  if (!productId) return res.status(400).json({ error: "productId required" });

  try {
    await ensureUserExists(userId);

    const product = await prisma.product.findUnique({ where: { id: Number(productId) } });
    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const existing = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId: product.id } });
    if (existing) {
      await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + Number(quantity) } });
    } else {
      await prisma.cartItem.create({ data: { cartId: cart.id, productId: product.id, quantity: Number(quantity), price: product.price } });
    }

    const updatedCart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to add to cart" });
  }
});

// Update item quantity
router.patch("/item/:itemId", async (req, res) => {
  const userId = req.user.id;
  const itemId = Number(req.params.itemId);
  const { quantity } = req.body;

  if (quantity == null) return res.status(400).json({ error: "quantity required" });

  try {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId }, include: { cart: true } });
    if (!item || item.cart.userId !== userId) return res.status(404).json({ error: "Item not found" });

    if (Number(quantity) <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
    } else {
      await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: Number(quantity) } });
    }

    const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update item" });
  }
});

// Remove item
router.delete("/item/:itemId", async (req, res) => {
  const userId = req.user.id;
  const itemId = Number(req.params.itemId);

  try {
    const item = await prisma.cartItem.findUnique({ where: { id: itemId }, include: { cart: true } });
    if (!item || item.cart.userId !== userId) return res.status(404).json({ error: "Item not found" });

    await prisma.cartItem.delete({ where: { id: itemId } });

    const cart = await prisma.cart.findUnique({ where: { userId }, include: { items: { include: { product: true } } } });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to remove item" });
  }
});

// Clear cart
router.delete("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (cart) await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to clear cart" });
  }
});

export default router;
