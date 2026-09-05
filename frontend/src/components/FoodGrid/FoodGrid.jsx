import { FoodCard } from "../FoodCard/FoodCard";
import "./FoodGrid.css";

export function FoodGrid({ foods, onOpenDetails }) {
  return (
    <div className="food-grid">
      {foods.map((food) => (
        <FoodCard key={food._id} food={food} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}
