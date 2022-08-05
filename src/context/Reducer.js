export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INIT_PRODUCTS":
      let cart = JSON.parse(localStorage.getItem("CART")) ?? [];

      return { products: action.payload, cart: cart, showCart: state.showCart };

    case "ADD_TO_CART":
      let addIndex = state.cart.findIndex((cartItem) => cartItem.id === action.payload.id);

      if (addIndex !== -1) {
        let cartItemToAdd = state.cart[addIndex];
        const updatedCartItemToAdd = {
          ...cartItemToAdd,
          qty: cartItemToAdd.qty + 1,
        };

        const postAddCart = [...state.cart];
        postAddCart[addIndex] = updatedCartItemToAdd;

        localStorage.setItem("CART", JSON.stringify(postAddCart));

        return { ...state, cart: postAddCart, showCart: state.showCart };
      } else {
        localStorage.setItem("CART", JSON.stringify([...state.cart, { ...action.payload, qty: 1 }]));

        return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }], showCart: state.showCart };
      }

    case "REMOVE_FROM_CART":
      let removeIndex = state.cart.findIndex((cartItem) => cartItem.id === action.payload.id);

      if (removeIndex !== -1) {
        let cartItemToRemove = state.cart[removeIndex];

        if (cartItemToRemove.qty > 1) {
          const updatedCartItemToRemove = {
            ...cartItemToRemove,
            qty: cartItemToRemove.qty - 1,
          };

          const postRemoveCart = [...state.cart];
          postRemoveCart[removeIndex] = updatedCartItemToRemove;

          localStorage.setItem("CART", JSON.stringify(postRemoveCart));

          return { ...state, cart: postRemoveCart, showCart: state.showCart };
        } else {
          localStorage.setItem("CART", JSON.stringify(state.cart.filter((cartItem) => cartItem.id !== action.payload.id)));

          return {
            ...state,
            cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
            showCart: state.showCart,
          };
        }
      }
      break;

    case "DELETE_FROM_CART":
      localStorage.setItem("CART", JSON.stringify(state.cart.filter((cartItem) => cartItem.id !== action.payload.id)));

      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== action.payload.id),
        showCart: state.showCart,
      };

    case "SHOW_HIDE_CART":
      return { ...state, cart: state.cart, showCart: !state.showCart };

    default:
      return state;
  }
};

export const sortReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };

    case "SEARCH":
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
};
