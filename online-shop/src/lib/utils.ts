export function hasDiscount(price: number, discountedPrice: number): boolean {
  return discountedPrice < price;
}

export function getDiscountPercentage(
  price: number,
  discountedPrice: number,
): number {
  return Math.round(((price - discountedPrice) / price) * 100);
}