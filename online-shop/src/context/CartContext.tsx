"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartContextType, CartItem } from "../types/cart";

// I usually leave context undefined so the hook can complain if used wrong
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {

  const [itemsInCart, setItemsInCart] = useState<CartItem[]>([]);

  // ---- Load cart from storage ----
  useEffect(() => {
    // honestly localStorage parsing has bitten me before so wrapping it
    const stored = localStorage.getItem("cart");

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored);

      // just a quick sanity check
      if (Array.isArray(parsed)) {
        setItemsInCart(parsed);
      }
    } catch (e) {
      console.warn("cart in localStorage looked weird, resetting", e);
      setItemsInCart([]);
    }

  }, []);


  // ---- Persist cart whenever it changes ----
  useEffect(() => {
    try {
      const serialized = JSON.stringify(itemsInCart);
      localStorage.setItem("cart", serialized);
    } catch (err) {
      // not much i can do here honestly
      console.error("failed saving cart", err);
    }
  }, [itemsInCart]);


  function addToCart(product: Omit<CartItem, "quantity">) {

    setItemsInCart((prevCart) => {

      // checking if this item already exists
      let existing = prevCart.find((p) => p.id === product.id);

      if (existing) {

        const updatedList = prevCart.map((p) => {

          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + 1
            };
          }

          return p;

        });

        return updatedList;
      }

      // if it's not there yet just push a new one
      const newEntry: CartItem = {
        ...product,
        quantity: 1
      };

      return [...prevCart, newEntry];

    });

  }


  function removeFromCart(id: string) {

    setItemsInCart((cart) => {
      const filtered = cart.filter((p) => p.id !== id);
      return filtered;
    });

  }


  function increaseQuantity(id: string) {

    setItemsInCart((cartList) => {

      const next = cartList.map((item) => {

        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1
          };
        }

        return item;
      });

      return next;

    });

  }


  function decreaseQuantity(id: string) {

    setItemsInCart((cartList) => {

      let updated = cartList.map((item) => {

        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1
          };
        }

        return item;

      });

      // remove items that dropped to zero
      updated = updated.filter((item) => item.quantity > 0);

      return updated;

    });

  }


  function clearCart() {
    // TODO maybe add a confirmation dialog later
    setItemsInCart([]);
  }


  // ---- Derived values ----

  const itemCount = useMemo(() => {

    let count = 0;

    for (let i = 0; i < itemsInCart.length; i++) {
      count += itemsInCart[i].quantity;
    }

    return count;

  }, [itemsInCart]);


  const totalPrice = useMemo(() => {

    let sum = 0;

    itemsInCart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      sum += itemTotal;
    });

    return sum;

  }, [itemsInCart]);


  // const hasItems = itemsInCart.length > 0; 


  return (
    <CartContext.Provider
      value={{
        items: itemsInCart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        itemCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {

  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return ctx;

}