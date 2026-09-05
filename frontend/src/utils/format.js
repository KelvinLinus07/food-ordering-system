export function formatPrice(value) {
  const number = Number(value) || 0;
  return `₹${number.toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FD-${timestamp}-${random}`;
}

export function estimateDeliveryWindow(minutesFrom = 30, minutesTo = 45) {
  const now = new Date();
  const from = new Date(now.getTime() + minutesFrom * 60000);
  const to = new Date(now.getTime() + minutesTo * 60000);
  const fmt = (d) =>
    d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  return `${fmt(from)} – ${fmt(to)}`;
}
