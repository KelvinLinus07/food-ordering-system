import { useCallback, useEffect, useState } from "react";
import { foodService } from "../api/foodService";

export function useFoods() {
  const [foods, setFoods] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await foodService.getAll();
      setFoods(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (err) {
      setError(err.message || "Failed to load the menu.");
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { foods, status, error, reload: load, setFoods };
}
