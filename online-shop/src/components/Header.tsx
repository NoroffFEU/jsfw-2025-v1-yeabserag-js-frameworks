"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="border-b border-neutral-300 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <Link href="/" className="text-lg font-semibold tracking-tight text-black">
          Online Shop
        </Link>

        <nav className="flex items-center gap-6 text-sm text-neutral-700">
          <Link href="/">Home</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="border border-neutral-300 px-3 py-1">
            Cart ({itemCount})
          </Link>
        </nav>
      </div>
    </header>
  );
}