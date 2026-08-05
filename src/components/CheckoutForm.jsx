import { useState } from "react";
import { useCheckout } from "../hooks/useCheckout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CheckoutForm({ onSuccess, onCancel }) {
  const { checkout } = useCheckout();
  const { cart, clearCart, subtotal } = useCart();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isAuthenticated) {
      setError("You must be logged in to checkout");
      setLoading(false);
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      setLoading(false);
      return;
    }

    try {
      const order = await checkout(formData);
      clearCart();
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
        city: "",
        postalCode: "",
      });
      onSuccess(order);
    } catch (err) {
      setError(err.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Order Summary */}
        <div className="mb-6 pb-4 border-b">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-1 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2 border-t flex justify-between font-semibold">
            <span>Total:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Full Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Phone</label>
            <input
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Shipping Address</label>
            <input
              type="text"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="123 Main St"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="New York"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="10001"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : `Place Order ($${subtotal.toFixed(2)})`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
