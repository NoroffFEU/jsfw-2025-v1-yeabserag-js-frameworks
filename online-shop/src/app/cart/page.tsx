"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useCart();

  function handleRemove(id: string) {
    removeFromCart(id);
    toast.success("Product removed from cart");
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-6 text-3xl font-semibold">Cart</h1>
        <p className="mb-6 text-neutral-600">Your cart is empty.</p>
        <Link href="/" className="border border-black px-4 py-2 text-sm">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-semibold">Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-4 border border-neutral-300 p-4 md:grid-cols-[100px_1fr_auto]"
          >
            <img
              src={item.imageUrl}
              alt={item.title}
              className="h-24 w-full object-cover"
            />

            <div className="space-y-2">
              <h2 className="font-medium">{item.title}</h2>
              <p className="text-sm text-neutral-600">
                ${item.price.toFixed(2)}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="border border-neutral-300 px-3 py-1 text-sm"
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="border border-neutral-300 px-3 py-1 text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <p className="font-medium">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.id)}
                className="border border-black px-3 py-1 text-sm hover:bg-black hover:text-white"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-neutral-300 pt-6">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Total</p>
          <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
        </div>

        <Link
          href="/checkout-success"
          className="mt-6 inline-block border border-black px-6 py-2 text-sm transition hover:bg-black hover:text-white"
        >
          Checkout
        </Link>
      </div>
    </main>
  );
}