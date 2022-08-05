import { createContext, useMemo, useReducer, useContext } from "react";
import { cartReducer, sortReducer } from "./Reducer";

const CART = createContext();

const CartContext = ({ children }) => {
  useMemo(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        dispatch({type: "INIT_PRODUCTS", payload: json});
      });
  }, []);

  const [state, dispatch] = useReducer(cartReducer, {
    products: [],
    cart: [],
    showCart: false
  });

  const [sortState, sortDispatch] = useReducer(sortReducer, {
    sort: "",
    searchQuery: ""
  });

  return <CART.Provider value={{ state, dispatch, sortState, sortDispatch }}>{children}</CART.Provider>;
};

export default CartContext;

export const CartState = () => {
  return useContext(CART);
};
