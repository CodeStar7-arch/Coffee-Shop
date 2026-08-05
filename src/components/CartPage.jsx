import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CheckoutForm from "./CheckoutForm";
import OrderConfirmation from "./OrderConfirmation";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, subtotal, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  if (orderConfirmed) {
    return <OrderConfirmation order={orderConfirmed} onClose={() => setOrderConfirmed(null)} />;
  }

  if (showCheckout) {
    return (
      <CheckoutForm
        onSuccess={(order) => {
          setShowCheckout(false);
          setOrderConfirmed(order);
        }}
        onCancel={() => setShowCheckout(false)}
      />
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            Please log in to proceed with your order.
          </div>
        )}

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-6">Your cart is empty</p>
            <a
              href="#shop"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 flex gap-4"
                >
                  {/* Product Image */}
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      ${item.price.toFixed(2)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={loading}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 border rounded">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        disabled={loading}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right">
                    <p className="font-bold text-lg mb-2">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 text-sm font-semibold disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={() => setShowCheckout(true)}
                  disabled={!isAuthenticated || cart.length === 0 || loading}
                  className="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Proceed to Checkout"}
                </button>

                <a
                  href="#shop"
                  className="block text-center mt-3 text-amber-600 hover:text-amber-700 font-semibold"
                >
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
