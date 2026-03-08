"use client";

import { useCart } from "../context/CartContext";
import { Product } from "../types/product";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {

  const cart = useCart();
  const addItem = cart.addToCart; // pulling this out so the handler looks cleaner

  function handleAddToCart() {

    // creating a smaller object instead of passing the whole product
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.discountedPrice,
      imageUrl: product.image.url,
    };

    addItem(itemToAdd);

    // console.log("added product", itemToAdd); // used this while testing earlier

    toast.success("Product added to cart");
  }

  const buttonText = "Add to Cart"; // might reuse later if I add icons or loading states

  return (
    <button
      onClick={handleAddToCart}
      className="border border-black px-6 py-2 text-sm transition hover:bg-black hover:text-white"
    >
      {buttonText}
    </button>
  );
}