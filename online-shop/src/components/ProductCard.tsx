import Link from "next/link";
import { Product } from "../types/product";
import { getDiscountPercentage, hasDiscount } from "../lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isDiscounted = hasDiscount(product.price, product.discountedPrice);
  const discountPercentage = isDiscounted
    ? getDiscountPercentage(product.price, product.discountedPrice)
    : 0;

  return (
    <Link
      href={`/product/${product.id}`}
      className="group border border-neutral-300 bg-white p-4 transition hover:border-black"
    >
      <div className="relative aspect-square overflow-hidden border border-neutral-200 bg-neutral-50">
        {isDiscounted && (
          <span className="absolute left-0 top-0 border-r border-b border-black bg-black px-3 py-1 text-xs font-medium tracking-wide text-white">
            -{discountPercentage}%
          </span>
        )}

        <img
          src={product.image.url}
          alt={product.image.alt || product.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="mt-4 space-y-2">
        <h2 className="text-base font-medium text-black">{product.title}</h2>

        <p className="text-sm text-neutral-600">Rating: {product.rating}/5</p>

        <div className="flex items-center gap-2 text-sm">
          {isDiscounted ? (
            <>
              <span className="font-semibold text-black">
                ${product.discountedPrice.toFixed(2)}
              </span>
              <span className="text-neutral-500 line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-black">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}