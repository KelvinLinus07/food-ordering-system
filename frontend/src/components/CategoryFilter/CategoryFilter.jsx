import { getCategoryIcon } from "../../utils/demoContent";
import "./CategoryFilter.css";

export function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter by category">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={active === category}
          className={`category-pill ${active === category ? "is-active" : ""}`}
          onClick={() => onChange(category)}
        >
          <span className="category-pill-icon" aria-hidden="true">
            {getCategoryIcon(category)}
          </span>
          {category}
        </button>
      ))}
    </div>
  );
}
