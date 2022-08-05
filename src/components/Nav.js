import { CartState } from "../context/Context";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const Nav = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const totalQuantity = useMemo(() => {
    if (cart) return cart.reduce((quantity, item) => item.qty + quantity, 0);
  }, [cart]);

  return (
    <div className="z-10 h-14 px-8 sm:px-14 flex items-center justify-between fixed text-white bg-slate-900 inset-x-0 top-0">
      <div className="hover:opacity-75">
        <Link to="/">Store</Link>
      </div>
      <div className="cursor-pointer relative group">
        <i data-testid="cart"
          className="fa fa-shopping-cart group-hover:opacity-75"
          aria-hidden="true"
          onClick={() => {
            dispatch({
              type: "SHOW_HIDE_CART",
            });
          }}
        />
        {cart.length > 0 && (
          <div className="group-hover:animate-bounce z-10 absolute display-grid text-xs text-center bg-red-500 rounded-full h-4 w-4 -top-1/3 -right-2/3">
            <span>{totalQuantity}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
