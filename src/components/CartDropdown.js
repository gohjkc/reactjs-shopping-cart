import { CartState } from "../context/Context";
import CartDropdownItem from "./CartDropdownItem";
import { useMemo } from "react";

const CartDropdown = () => {
  const {
    state: { cart, showCart },
    dispatch,
  } = CartState();

  const totalPrice = useMemo(() => {
    if (cart) return cart.reduce((amount, item) => item.price * item.qty + amount, 0);
  }, [cart]);

  return (
    <>
      {showCart && (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed overflow-hidden">
            <div className="absolute overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-6">
                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-3">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                          Your cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => {
                              dispatch({
                                type: "SHOW_HIDE_CART",
                              });
                            }}
                          >
                            <i className="fa fa-times-circle"></i>
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        {cart.length === 0 && (
                          <div className="text-gray-500">
                            <p>Your cart is empty!</p>
                          </div>
                        )}
                        <div className="flow-root">
                          <ul className="divide-y divide-gray-200">
                            {cart.map((item) => (
                              <CartDropdownItem key={item.id} item={item} />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice.toFixed(2)}</p>
                      </div>
                      <div className="mt-6">
                        <button
                          className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => {
                            dispatch({
                              type: "SHOW_HIDE_CART",
                            });
                          }}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDropdown;
