
const REVIEW_TEMPLATES = [
  { name: "Aarav M.", text: "Really good, will order again. Portion size was generous too." },
  { name: "Priya S.", text: "Tasted fresh and arrived hot. One of my regular picks now." },
  { name: "Rohan K.", text: "Decent flavour, slightly less spicy than I expected." },
  { name: "Sneha T.", text: "Loved it! Packaging was neat and nothing spilled." },
  { name: "Vikram J.", text: "Good value for the price. Would recommend to friends." },
  { name: "Isha R.", text: "Great taste, but could arrive a little quicker next time." },
];

function hashString(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDemoRating(food) {
  const seed = hashString(food?._id || food?.name || "food");
  // Range: 3.6 – 4.9, biased toward "good" since this is a curated menu
  const rating = 3.6 + (seed % 14) / 10;
  const reviewCount = 18 + (seed % 240);
  return { rating: Math.round(rating * 10) / 10, reviewCount };
}

export function getDemoReviews(food, count = 3) {
  const seed = hashString(food?._id || food?.name || "food");
  const reviews = [];
  for (let i = 0; i < count; i++) {
    const template = REVIEW_TEMPLATES[(seed + i * 7) % REVIEW_TEMPLATES.length];
    const stars = 4 + ((seed + i) % 2); // 4 or 5 stars, keeps things positive
    reviews.push({ ...template, stars, id: `${seed}-${i}` });
  }
  return reviews;
}

const CATEGORY_ICONS = {
  All: "🍽️",
  Pizza: "🍕",
  Burger: "🍔",
  Indian: "🍛",
  Chinese: "🥡",
  Drinks: "🥤",
  Desserts: "🍰",
  Salad: "🥗",
  Seafood: "🦐",
  Breakfast: "🍳",
};

export function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || "🍴";
}

export function isBestSeller(food) {

  return hashString(food?._id || food?.name || "food") % 5 === 0;
}
