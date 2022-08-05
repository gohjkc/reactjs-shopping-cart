import { CartState } from "../context/Context";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const Product = () => {
  const { id } = useParams();
  const {
    state: { products },
    dispatch,
  } = CartState();

  const product = useMemo(() => products.find((product) => product.id == id), [products, id]);

  return (
    <>
      {product && (
        <div className="mt-20">
          <div className="mt-6 mx-auto sm:max-w-sm sm:px-6 lg:max-w-md lg:px-8">
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.title} className="w-full h-full object-center object-cover" />
            </div>
          </div>

          <div className="mx-auto py-16 px-4 lg:px-8 max-w-2xl lg:max-w-7xl lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
            </div>

            <div className="mt-4 lg:mt-0 lg:row-span-3">
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <i
                        key={rating}
                        className={
                          product.rating.rate >= rating
                            ? "text-yellow-400 fas fa-star"
                            : product.rating.rate + 0.5 > rating
                              ? "text-yellow-400 fas fa-star-half-alt"
                              : "text-yellow-400 far fa-star"
                        }
                        aria-hidden="true"
                      >
                      </i>
                    ))}
                  </div>
                  <span className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    {product.rating.count} reviews
                  </span>
                </div>
              </div>

              <button data-testid="add-to-cart"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: product,
                  });
                }}
              >
                Add to cart
              </button>
            </div>

            <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
