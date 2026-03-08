import { getProductById } from "../../../lib/api";
import { Product } from "../../../types/product";
import { hasDiscount } from "../../../lib/utils";
import AddToCartButton from "../../../components/AddToCartButton";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  let product: Product | null = null;
  let error = "";

  const { id } = await params;

  try {
    product = await getProductById(id);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Unable to load this product.";
  }

  if (error || !product) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      </main>
    );
  }

  const discounted = hasDiscount(product.price, product.discountedPrice);


  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="border border-neutral-300 bg-neutral-50">
          <img
            src={product.image.url}
            alt={product.image.alt || product.title}
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <p className="text-neutral-700">{product.description}</p>

          <div className="text-lg">
            {discounted ? (
              <>
                <span className="font-semibold">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="ml-3 text-neutral-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-sm text-neutral-600">
            Rating: {product.rating}/5
          </p>

          <AddToCartButton product={product} />

          {product.tags.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-neutral-300 px-2 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.reviews.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-semibold">Reviews</h2>
              <div className="space-y-3">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-neutral-300 p-3 text-sm"
                  >
                    <p className="font-semibold">{review.username}</p>
                    <p>Rating: {review.rating}</p>
                    <p className="text-neutral-600">{review.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}