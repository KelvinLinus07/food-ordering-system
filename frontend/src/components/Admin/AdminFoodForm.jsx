import { useEffect, useState } from "react";
import "./AdminFoodForm.css";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  available: true,
};

export function AdminFoodForm({ initialFood, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialFood) {
      setForm({
        name: initialFood.name || "",
        description: initialFood.description || "",
        price: initialFood.price ?? "",
        category: initialFood.category || "",
        image: initialFood.image || "",
        available: initialFood.available ?? true,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [initialFood]);

  const handleChange = (field) => (e) => {
    const value =
      field === "available" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.description.trim() || !form.category.trim()) {
      setError("Name, description, and category are required.");
      return;
    }

    const priceNumber = Number(form.price);
    if (Number.isNaN(priceNumber) || priceNumber < 0) {
      setError("Enter a valid price.");
      return;
    }

    try {
      await onSubmit({
        name: form.name.trim(),
        description: form.description.trim(),
        price: priceNumber,
        category: form.category.trim(),
        image: form.image.trim(),
        available: form.available,
      });
    } catch (err) {
      setError(err.message || "Failed to save food item.");
    }
  };

  return (
    <form className="admin-food-form" onSubmit={handleSubmit}>
      <h3>{initialFood ? "Edit food item" : "Add a new food item"}</h3>

      {error && <div className="admin-form-error">{error}</div>}

      <label>
        Name
        <input type="text" value={form.name} onChange={handleChange("name")} placeholder="Paneer Butter Masala" />
      </label>

      <label>
        Description
        <textarea
          rows={3}
          value={form.description}
          onChange={handleChange("description")}
          placeholder="Rich, creamy tomato gravy with paneer cubes"
        />
      </label>

      <div className="admin-form-row">
        <label>
          Price (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={handleChange("price")}
            placeholder="249"
          />
        </label>

        <label>
          Category
          <input
            type="text"
            value={form.category}
            onChange={handleChange("category")}
            placeholder="Indian"
          />
        </label>
      </div>

      <label>
        Image URL
        <input
          type="text"
          value={form.image}
          onChange={handleChange("image")}
          placeholder="https://example.com/paneer.jpg"
        />
      </label>

      <label className="admin-form-checkbox">
        <input type="checkbox" checked={form.available} onChange={handleChange("available")} />
        Available for order
      </label>

      <div className="admin-form-actions">
        {onCancel && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Saving..." : initialFood ? "Save changes" : "Add item"}
        </button>
      </div>
    </form>
  );
}
