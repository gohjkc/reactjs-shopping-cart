import { CartState } from "../context/Context";
import { Link } from "react-router-dom";

const CartDropdownItem = ({ item }) => {
  const { dispatch } = CartState();

  let price = item.price * item.qty;

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link
          to={{ pathname: "product/" + item.id }}
          onClick={() => {
            dispatch({
              type: "SHOW_HIDE_CART",
            });
          }}
        >
          <img src={item.image} alt={item.title} className="h-full w-full object-contain p-2 hover:cursor-pointer" />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="hover:cursor-pointer">
              <Link
                to={{ pathname: "product/" + item.id }}
                onClick={() => {
                  dispatch({
                    type: "SHOW_HIDE_CART",
                  });
                }}
              >
                <span className="line-clamp-3">{item.title}</span>
              </Link>
            </h3>
            <p className="ml-4">${price.toFixed(2)}</p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex flex-1 gap-4 items-center">
            <span>Qty: </span>
            <i data-testid="decrease-quantity"
              className="fa fa-minus cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: item,
                });
              }}
            ></i>
            <span className="text-gray-500">{item.qty}</span>
            <i data-testid="increase-quantity"
              className="fa fa-plus cursor-pointer"
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: item,
                });
              }}
            ></i>
          </div>

          <div className="flex">
            <button data-testid="delete-from-cart"
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => {
                dispatch({
                  type: "DELETE_FROM_CART",
                  payload: item,
                });
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartDropdownItem;
