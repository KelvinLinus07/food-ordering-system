import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

const STORAGE_KEY = "food-ordering-cart";

const CartContext = createContext(null);

function loadInitialState() {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.items)) return { items: [] };
    return parsed;
  } catch {
    return { items: [] };
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const { food, quantity } = action.payload;
      const existing = state.items.find((item) => item._id === food._id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item._id === food._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            _id: food._id,
            name: food.name,
            price: food.price,
            image: food.image,
            category: food.category,
            quantity,
          },
        ],
      };
    }

    case "INCREMENT":
      return {
        items: state.items.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREMENT":
      return {
        items: state.items
          .map((item) =>
            item._id === action.payload.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item._id !== action.payload.id),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (food, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { food, quantity } });
  const increment = (id) => dispatch({ type: "INCREMENT", payload: { id } });
  const decrement = (id) => dispatch({ type: "DECREMENT", payload: { id } });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const itemCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value = {
    items: state.items,
    itemCount,
    subtotal,
    addItem,
    increment,
    decrement,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
