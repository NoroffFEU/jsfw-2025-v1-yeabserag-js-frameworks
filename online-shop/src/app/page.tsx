"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("https://v2.api.noroff.dev/online-shop");
        const json = await response.json();
        setProducts(json.data);
      } catch {
        setError("Unable to load products right now. Please try again later.");
      }
    }

    loadProducts();
  }, []);

  const matchingProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-white px-6 py-10 md:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            Online Shop
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            A  selection of products by Noroff with a simple and easy shopping experience.
          </p>

          <div className="mt-6 max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full border border-neutral-300 px-4 py-3 outline-none"
            />

            {search.trim() && (
              <div className="border-x border-b border-neutral-300 bg-white">
                {matchingProducts.length > 0 ? (
                  matchingProducts.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="block border-t border-neutral-300 px-4 py-3 text-sm hover:bg-neutral-50"
                    >
                      {product.title}
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-neutral-600">
                    No matching products found.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {error ? (
          <div className="border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}