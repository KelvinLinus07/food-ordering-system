import { useMemo, useState } from "react";
import { useFoods } from "../hooks/useFoods";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter/CategoryFilter";
import { FoodGrid } from "../components/FoodGrid/FoodGrid";
import { FoodGridSkeleton } from "../components/Loading/Loading";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { FoodDetailModal } from "../components/FoodDetail/FoodDetailModal";
import { OffersBanner } from "../components/OffersBanner/OffersBanner";
import { PopularToday } from "../components/PopularToday/PopularToday";
import { isBestSeller } from "../utils/demoContent";
import "./Home.css";

export function Home() {
  const { foods, status, error, reload } = useFoods();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedFood, setSelectedFood] = useState(null);

  const categories = useMemo(() => {
    const unique = new Set(foods.map((f) => f.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [foods]);

  const popularFoods = useMemo(
    () => foods.filter((f) => f.available && isBestSeller(f)).slice(0, 8),
    [foods]
  );

  const filteredFoods = useMemo(() => {
    const query = search.trim().toLowerCase();
    return foods.filter((food) => {
      const matchesCategory = category === "All" || food.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        food.name?.toLowerCase().includes(query) ||
        food.description?.toLowerCase().includes(query) ||
        food.category?.toLowerCase().includes(query)
      );
    });
  }, [foods, search, category]);

  const isFiltering = search.trim().length > 0 || category !== "All";

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">Delivering across Siliguri</span>
            <h1>
              Good food,
              <br />
              ordered right.
            </h1>
            <p>
              Fresh dishes from your favourite kitchens, delivered hot in under
              an hour. Search the menu or browse by cuisine to get started.
            </p>
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-art-blob" />
            <div className="hero-art-plate hero-art-plate-1" />
            <div className="hero-art-plate hero-art-plate-2" />
          </div>
        </div>
      </section>

      <OffersBanner />

      {status === "success" && !isFiltering && popularFoods.length > 0 && (
        <PopularToday foods={popularFoods} onOpenDetails={setSelectedFood} />
      )}

      <section className="menu-section">
        <div className="container">
          <CategoryFilter
            categories={categories}
            active={category}
            onChange={setCategory}
          />

          {status === "loading" && <FoodGridSkeleton />}

          {status === "error" && (
            <ErrorMessage
              title="Couldn't load the menu"
              message={error}
              onRetry={reload}
            />
          )}

          {status === "success" && filteredFoods.length === 0 && (
            <EmptyState
              title={foods.length === 0 ? "No dishes yet" : "No results found"}
              message={
                foods.length === 0
                  ? "The menu is empty right now. Check back soon."
                  : "Try a different search term or category."
              }
            />
          )}

          {status === "success" && filteredFoods.length > 0 && (
            <FoodGrid foods={filteredFoods} onOpenDetails={setSelectedFood} />
          )}
        </div>
      </section>

      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          allFoods={foods}
          onClose={() => setSelectedFood(null)}
          onSelectFood={setSelectedFood}
        />
      )}
    </>
  );
}
