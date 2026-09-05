import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "food-ordering-favorites";

const FavoritesContext = createContext(null);

function loadInitial() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(loadInitial);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const isFavorite = (id) => ids.includes(id);

  const toggleFavorite = (id) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const value = useMemo(
    () => ({ favoriteIds: ids, isFavorite, toggleFavorite }),
    [ids]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
