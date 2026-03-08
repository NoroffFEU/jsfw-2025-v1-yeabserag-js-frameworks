"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {

  const cart = useCart();
  const itemCount = cart.itemCount; // easier to read than accessing cart.itemCount everywhere

  const shopName = "Online Shop"; // might moove this to config later

  return (
    <header className="border-b border-neutral-300 bg-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">

        {/* Logo / shop title */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-black"
        >
          {shopName}
        </Link>

        <nav className="flex items-center gap-6 text-sm text-neutral-700">

          <Link href="/">
            Home
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          {/* Cart link with item count */}
          <Link
            href="/cart"
            className="border border-neutral-300 px-3 py-1"
          >
            Cart ({itemCount})
          </Link>

          

        </nav>

      </div>

    </header>
  );
}