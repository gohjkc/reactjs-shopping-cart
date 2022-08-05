import { CartState } from "../context/Context";
import ProductCard from "./ProductCard";

const Dashboard = () => {
  const {
    state: { products },
    sortState: { sort, searchQuery },
    sortDispatch
  } = CartState();

  const requestSort = (event) => {
    let sortBy = event.target.value;
    if (sortBy === "Price (Asc)") {
      sortDispatch({
        type: "SORT_BY_PRICE",
        payload: "ASC"
      })
    }
    else if (sortBy === "Price (Desc)") {
      sortDispatch({
        type: "SORT_BY_PRICE",
        payload: "DESC"
      })
    }
  }

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "ASC" ? a.price - b.price : b.price - a.price
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-0">
          <div className="my-1 relative rounded-md shadow-sm">
            <input type="text" name="price" id="price" className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-screen sm:max-w-md px-4 sm:text-sm border-gray-300 rounded-md" placeholder="Search products" onChange={(query) => {
              sortDispatch({
                type: "SEARCH",
                payload: query.target.value
              })
            }} />
          </div>

          <div className="my-1 relative">
            <div className="inset-y-0 right-0 flex justify-end items-center w-full">
              {/* <label htmlFor="currency" className="mr-3">Sort:</label> */}
              <select id="currency" name="currency" className="focus:ring-indigo-500 focus:border-indigo-500 h-full pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm border-gray-300 rounded-md shadow-sm" onChange={requestSort}>
                <option>Sort</option>
                <option>Price (Asc)</option>
                <option>Price (Desc)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="gap-y-10 mt-2 sm:mt-3 lg:mt-4 xl:mt-6 grid grid-cols-1  sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-12 px-4 sm:px-0">
          {products.length > 0 && (
            <>
              {transformProducts().map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
