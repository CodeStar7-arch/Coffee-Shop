import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:5000/api";

export function useCheckout() {
  const { token } = useAuth();

  const checkout = async (checkoutData) => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(checkoutData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || `Checkout failed: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Checkout error:", err);
      throw err;
    }
  };

  const getOrders = async () => {
    if (!token) {
      throw new Error("Not authenticated");
    }

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error("Fetch orders error:", err);
      throw err;
    }
  };

  return { checkout, getOrders };
}
