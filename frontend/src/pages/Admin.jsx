import { useMemo, useState } from "react";
import { useFoods } from "../hooks/useFoods";
import { foodService } from "../api/foodService";
import { useToast } from "../context/ToastContext";
import { AdminFoodForm } from "../components/Admin/AdminFoodForm";
import { AdminFoodList } from "../components/Admin/AdminFoodList";
import { StatsCards } from "../components/Admin/StatsCards";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { CategoryFilter } from "../components/CategoryFilter/CategoryFilter";
import { ConfirmDialog } from "../components/ConfirmDialog/ConfirmDialog";
import { ErrorMessage } from "../components/ErrorMessage/ErrorMessage";
import { EmptyState } from "../components/EmptyState/EmptyState";
import { Spinner } from "../components/Loading/Loading";
import "./Admin.css";

export function Admin() {
  const { foods, status, error, reload, setFoods } = useFoods();
  const { showToast } = useToast();

  const [editingFood, setEditingFood] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [pendingId, setPendingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const unique = new Set(foods.map((f) => f.category).filter(Boolean));
    return ["All", ...Array.from(unique)];
  }, [foods]);

  const filteredFoods = useMemo(() => {
    const query = search.trim().toLowerCase();
    return foods.filter((food) => {
      const matchesCategory = category === "All" || food.category === category;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        food.name?.toLowerCase().includes(query) ||
        food.description?.toLowerCase().includes(query)
      );
    });
  }, [foods, search, category]);

  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      const created = await foodService.create(data);
      setFoods((prev) => [created, ...prev]);
      showToast(`${created.name} was added to the menu.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data) => {
    setSubmitting(true);
    try {
      const updated = await foodService.update(editingFood._id, data);
      setFoods((prev) =>
        prev.map((f) => (f._id === updated._id ? updated : f))
      );
      setEditingFood(null);
      showToast(`${updated.name} was updated.`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const food = deleteTarget;
    setPendingId(food._id);
    try {
      await foodService.remove(food._id);
      setFoods((prev) => prev.filter((f) => f._id !== food._id));
      showToast(`${food.name} was deleted.`);
      if (editingFood?._id === food._id) setEditingFood(null);
    } catch (err) {
      showToast(err.message || "Failed to delete item.", { type: "error" });
    } finally {
      setPendingId(null);
      setDeleteTarget(null);
    }
  };

  const handleToggleAvailability = async (food) => {
    setPendingId(food._id);
    try {
      const updated = await foodService.update(food._id, {
        available: !food.available,
      });
      setFoods((prev) =>
        prev.map((f) => (f._id === updated._id ? updated : f))
      );
    } catch (err) {
      showToast(err.message || "Failed to update availability.", { type: "error" });
    } finally {
      setPendingId(null);
    }
  };

  const handleQuickAdd = () => {
    setEditingFood(null);
    document.getElementById("admin-food-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="admin-page container">
      <div className="admin-header">
        <div>
          <h1>Manage food</h1>
          <p>Add, edit, and update availability of items on the menu.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleQuickAdd}>
          + Quick add food
        </button>
      </div>

      {status === "success" && (
        <StatsCards
          total={foods.length}
          available={foods.filter((f) => f.available).length}
          categories={categories.length - 1}
        />
      )}

      <div className="admin-layout">
        <div className="admin-form-col" id="admin-food-form">
          <AdminFoodForm
            key={editingFood?._id || "new"}
            initialFood={editingFood}
            onSubmit={editingFood ? handleUpdate : handleCreate}
            onCancel={editingFood ? () => setEditingFood(null) : undefined}
            submitting={submitting}
          />
        </div>

        <div className="admin-list-col">
          <div className="admin-toolbar">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search food items..."
            />
          </div>

          {categories.length > 1 && (
            <CategoryFilter
              categories={categories}
              active={category}
              onChange={setCategory}
            />
          )}

          {status === "loading" && <Spinner label="Loading foods" />}

          {status === "error" && (
            <ErrorMessage message={error} onRetry={reload} />
          )}

          {status === "success" && foods.length === 0 && (
            <EmptyState
              title="No food items yet"
              message="Add your first dish using the form."
            />
          )}

          {status === "success" && foods.length > 0 && filteredFoods.length === 0 && (
            <EmptyState
              title="No matches found"
              message="Try a different search term or category."
            />
          )}

          {status === "success" && filteredFoods.length > 0 && (
            <AdminFoodList
              foods={filteredFoods}
              onEdit={setEditingFood}
              onDelete={setDeleteTarget}
              onToggleAvailability={handleToggleAvailability}
              pendingId={pendingId}
            />
          )}
        </div>
      </div>

      {deleteTarget && (
        <ConfirmDialog
          title="Delete this item?"
          message={`"${deleteTarget.name}" will be permanently removed from the menu. This can't be undone.`}
          confirmLabel="Delete"
          danger
          loading={pendingId === deleteTarget._id}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
