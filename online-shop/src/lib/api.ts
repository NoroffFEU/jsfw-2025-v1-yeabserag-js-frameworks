import { Product } from "../types/product";

const BASE_URL = "https://v2.api.noroff.dev";

interface ProductsResponse {
  data: Product[];
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/online-shop`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const json: ProductsResponse = await response.json();
  return json.data;
}