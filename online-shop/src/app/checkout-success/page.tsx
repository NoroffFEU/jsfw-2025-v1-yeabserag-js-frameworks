"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function CheckoutSuccessPage() {

  const cart = useCart();
  const clearCart = cart.clearCart; // pulling this out mostly for readability

  // clear the cart once the user lands here
  useEffect(() => {

    // this page basically means checkout finished
    // so we don't want leftover items sitting in the cart
    clearCart();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = "Order Confirmed"; 

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">

      <div className="border border-neutral-300 p-8">

        <h1 className="text-3xl font-semibold">
          {title}
        </h1>

        <p className="mt-4 text-neutral-600">
          Your order has been placed successfully.
        </p>

        {/* simple link back to the shop */}
        <Link
          href="/"
          className="mt-6 inline-block border border-black px-5 py-2 text-sm transition hover:bg-black hover:text-white"
        >
          Back to Shop
        </Link>

      </div>

    </main>
  );
}