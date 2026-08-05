import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export function CartProvider({ children }) {
  const { token, isAuthenticated } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper to make authenticated API calls
  const apiCall = async (method, endpoint, body = null) => {
    if (!token) {
      setError("Not authenticated");
      return null;
    }

    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      if (body) options.body = JSON.stringify(body);

      const res = await fetch(`${API_BASE}${endpoint}`, options);

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `API error: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("API call failed:", err);
      setError(err.message);
      return null;
    }
  };

  // Fetch cart from server on mount or when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    setLoading(true);
    const data = await apiCall("GET", "/cart");
    if (data) {
      setCart(data.items || []);
      setError(null);
    }
    setLoading(false);
  };

  const addToCart = async (product) => {
    if (!isAuthenticated) {
      setError("Must be logged in to add to cart");
      return;
    }

    setLoading(true);
    const data = await apiCall("POST", "/cart/add", {
      productId: product.id,
      quantity: 1,
    });

    if (data) {
      setCart(data.items || []);
      setError(null);
    }
    setLoading(false);
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;

    setLoading(true);
    const data = await apiCall("DELETE", `/cart/item/${itemId}`);

    if (data) {
      setCart(data.items || []);
      setError(null);
    }
    setLoading(false);
  };

  const increaseQuantity = async (itemId) => {
    if (!isAuthenticated) return;

    const item = cart.find((i) => i.id === itemId);
    if (!item) return;

    setLoading(true);
    const data = await apiCall("PATCH", `/cart/item/${itemId}`, {
      quantity: item.quantity + 1,
    });

    if (data) {
      setCart(data.items || []);
      setError(null);
    }
    setLoading(false);
  };

  const decreaseQuantity = async (itemId) => {
    if (!isAuthenticated) return;

    const item = cart.find((i) => i.id === itemId);
    if (!item || item.quantity <= 1) {
      await removeFromCart(itemId);
      return;
    }

    setLoading(true);
    const data = await apiCall("PATCH", `/cart/item/${itemId}`, {
      quantity: item.quantity - 1,
    });

    if (data) {
      setCart(data.items || []);
      setError(null);
    }
    setLoading(false);
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;

    setLoading(true);
    await apiCall("DELETE", "/cart");
    setCart([]);
    setError(null);
    setLoading(false);
  };

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  }, [cart]);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    subtotal,
    loading,
    error,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider.");
  }

  return context;
}