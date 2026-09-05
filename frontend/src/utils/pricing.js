export const DELIVERY_FEE = 30;
export const FREE_DELIVERY_THRESHOLD = 499;
export const TAX_RATE = 0.05;

export function calculateOrderTotals(subtotal) {
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryFee + tax;
  return { subtotal, deliveryFee, tax, total };
}
