import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CheckoutForm from "./CheckoutForm";
import OrderConfirmation from "./OrderConfirmation";

export default function CartPage({ onNavigate }) {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, subtotal, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);

  if (orderConfirmed) {
    return <OrderConfirmation order={orderConfirmed} onClose={() => setOrderConfirmed(null)} />;
  }

  const handleIncrease = async (itemId) => {
    setActiveItemId(itemId);
    await increaseQuantity(itemId);
    setActiveItemId(null);
  };

  const handleDecrease = async (itemId) => {
    setActiveItemId(itemId);
    await decreaseQuantity(itemId);
    setActiveItemId(null);
  };

  const handleRemove = async (itemId) => {
    setActiveItemId(itemId);
    await removeFromCart(itemId);
    setActiveItemId(null);
  };

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
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,230,179,0.18),_transparent_45%)] py-12 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 rounded-[32px] border border-amber-200/60 bg-white/95 p-8 shadow-[0_30px_80px_rgba(251,191,36,0.14)]">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-amber-700 mb-2">
                Your Cart
              </p>
              <h1 className="text-4xl font-bold text-slate-900">
                Your Cart
              </h1>
            </div>

            <div className="rounded-3xl bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-900 shadow-inner shadow-amber-100/80">
              {cart.length === 0 ? "No items yet" : `${cart.length} item${cart.length === 1 ? "" : "s"}`}
            </div>
          </div>

          {!isAuthenticated && (
            <div className="mt-6 rounded-3xl border border-blue-200 bg-blue-50/90 p-5 text-blue-900">
              Please log in to proceed with your order.
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="text-center rounded-[28px] border border-amber-200 bg-white/90 p-10 shadow-md">
            <p className="text-2xl font-semibold text-slate-800 mb-4">
              Your cart is empty
            </p>
            <p className="mb-6 text-slate-500">
              Browse our coffee selection and add a few bags to your cart.
            </p>
            <button
              type="button"
              onClick={() => {
                onNavigate("home");
                setTimeout(() => {
                  document.getElementById("shop")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 50);
              }}
              className="inline-block rounded-full bg-amber-600 px-6 py-3 text-white transition hover:bg-amber-700"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border border-amber-100 bg-white/95 shadow-sm rounded-[28px] p-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
                >
                  {/* Product Image */}
                  {item.product.image && (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full max-w-full rounded-3xl object-cover md:w-[260px] md:flex-none"
                    />
                  )}

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xl text-slate-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">
                      ${item.price.toFixed(2)} each
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium">
                        Qty: {item.quantity}
                      </div>

                      <div className="flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleDecrease(item.id)}
                          disabled={loading || activeItemId === item.id}
                          className="h-10 w-10 rounded-full bg-white text-lg font-bold text-slate-700 transition hover:bg-amber-100 disabled:opacity-50"
                        >
                          −
                        </button>
                        <span className="min-w-[40px] text-center text-base font-semibold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrease(item.id)}
                          disabled={loading || activeItemId === item.id}
                          className="h-10 w-10 rounded-full bg-white text-lg font-bold text-slate-700 transition hover:bg-amber-100 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-start gap-3 text-left md:items-end">
                    <p className="font-bold text-lg text-slate-900">
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      disabled={loading || activeItemId === item.id}
                      className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1 self-start">
              <div className="sticky top-24 rounded-[32px] border border-amber-100 bg-white/95 p-6 shadow-[0_20px_60px_rgba(251,191,36,0.12)]">
                <h2 className="text-2xl font-bold mb-4 text-slate-900">Order Summary</h2>

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
                  type="button"
                  onClick={() => setShowCheckout(true)}
                  disabled={!isAuthenticated || cart.length === 0 || loading}
                  className="w-full rounded-full bg-amber-600 px-4 py-3 text-white font-semibold transition hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : "Proceed to Checkout"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate("home");
                    setTimeout(() => {
                      document.getElementById("shop")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 50);
                  }}
                  className="block w-full rounded-full border border-amber-200 bg-white py-3 text-amber-700 font-semibold transition hover:bg-amber-50 mt-3"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
