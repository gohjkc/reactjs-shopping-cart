import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  return (
    <Link data-testid={product.id} to={{ pathname: "product/" + product.id.toString() }} className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-transparent border-gray-500 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <img src={product.image} alt={product.title} className="w-full h-full object-center object-contain p-3 group-hover:opacity-75 group-hover:scale-110 ease-in duration-300" />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900 bottom-0">${product.price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;
