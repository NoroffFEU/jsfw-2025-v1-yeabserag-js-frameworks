"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Product } from "../types/product";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const cart = useCart();

  function handleAddToCart() {
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.discountedPrice,
      imageUrl: product.image.url,
    };

    cart.addToCart(itemToAdd);
    toast.success(`${product.title} added to cart`);

    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      aria-live="polite"
      className={`border px-6 py-2 text-sm transition ${
        isAdded
          ? "border-green-700 bg-green-700 text-white"
          : "border-black text-black hover:bg-black hover:text-white"
      }`}
    >
      {isAdded ? "Added ✓" : "Add to Cart"}
    </button>
  );
}