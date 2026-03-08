import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";
import { Product } from "../types/product";

export default async function Home() {
  let products: Product[] = [];
  let error = "";

  try {
    products = await getProducts();
  } catch {
    error = "Unable to load products right now. Please try again later.";
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 md:px-10 lg:px-16">
      <section className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-neutral-300 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black">
            Online Shop
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600">
            A curated selection of products with a minimal shopping experience.
          </p>
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