import { useMemo, useState } from "react";
import { useFoods } from "../hooks/useFoods";
import { useFavorites } from "../context/FavoritesContext";
import { FoodGrid } from "../components/FoodGrid/FoodGrid";
import { FoodGridSkeleton } from "../components/Loading/Loading";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { FoodDetailModal } from "../components/FoodDetail/FoodDetailModal";
import "./Favorites.css";

export function Favorites() {
  const { foods, status, error, reload } = useFoods();
  const { favoriteIds } = useFavorites();
  const [selectedFood, setSelectedFood] = useState(null);

  const favoriteFoods = useMemo(
    () => foods.filter((food) => favoriteIds.includes(food._id)),
    [foods, favoriteIds]
  );

  return (
    <div className="favorites-page container">
      <div className="favorites-header">
        <h1>Your favorites</h1>
        <p>Dishes you've saved for later, all in one place.</p>
      </div>

      {status === "loading" && <FoodGridSkeleton count={3} />}

      {status === "error" && (
        <ErrorMessage message={error} onRetry={reload} />
      )}

      {status === "success" && favoriteFoods.length === 0 && (
        <EmptyState
          icon="🤍"
          title="No favorites yet"
          message="Tap the heart on any dish to save it here."
        />
      )}

      {status === "success" && favoriteFoods.length > 0 && (
        <FoodGrid foods={favoriteFoods} onOpenDetails={setSelectedFood} />
      )}

      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          allFoods={foods}
          onClose={() => setSelectedFood(null)}
          onSelectFood={setSelectedFood}
        />
      )}
    </div>
  );
}
