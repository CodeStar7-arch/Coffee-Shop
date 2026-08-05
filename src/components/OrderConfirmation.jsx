import { useState, useEffect } from "react";

export default function OrderConfirmation({ order, onClose }) {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id.toString());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Success Icon */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">Order Confirmed! ☕</h2>
        <p className="text-center text-gray-600 mb-6">
          Thank you for your order. We'll send you a confirmation email shortly.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Order ID:</span>
            <button
              onClick={copyOrderId}
              className="font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              #{order.id}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            {copySuccess && <span className="text-green-600 text-xs">Copied!</span>}
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">{formatDate(order.createdAt)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Status:</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>

          <div className="pt-2 border-t">
            <p className="text-sm text-gray-600 mb-1">Shipping To:</p>
            <p className="text-sm font-medium">{order.customerName}</p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress}, {order.city} {order.postalCode}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 text-sm">Order Items</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">${(item.quantity * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
