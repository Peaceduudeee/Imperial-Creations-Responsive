import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onCardClick }) {
  const { addToCart } = useCart();

  return (
    <div 
      className="bg-white border-2 border-[#D4AF37] shadow-lg p-4 rounded-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
      onClick={onCardClick} // Clicking the card opens the product modal
    >
      {/* Product Image */}
      <div className="relative w-full h-60 rounded-lg overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
            No Image Available
          </div>
        )}
      </div>
      
      {/* Product Details */}
      <div className="mt-4 text-center">
        <h3 
          className="text-xl font-semibold text-gray-900 mb-1" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {product.name}
        </h3>
        {product.material && (
          <p className="text-lg text-gray-700 mb-2">Material: {product.material}</p>
        )}
        <p className="text-2xl font-bold text-[#D4AF37] mb-4">
          ₹{product.price}
        </p>
      </div>
      
      {/* Add to Cart Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
        className="w-full bg-[#D4AF37] text-white py-3 rounded-md font-bold shadow-md hover:bg-[#C09835] transition"
      >
        Add to Cart
      </button>
    </div>
  );
}