import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    onClose(); // Optionally close the modal after adding
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Modal Container - Responsive */}
      <div className="relative bg-white rounded-xl p-6 sm:p-8 z-50 max-w-4xl w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto shadow-lg
                      flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl sm:text-3xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-60 sm:h-72 md:h-96 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="mt-4 md:mt-0 md:ml-6 flex-1 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#3f383d]">
            {product.name}
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-[#D4AF37] mt-2">
            ₹{product.price}
          </p>
          <p className="mt-3 text-gray-700 text-sm sm:text-base">
            {product.description || "No description available."}
          </p>
          
          {/* Additional Info */}
          {product.size && (
            <p className="mt-2 text-gray-700 text-sm sm:text-base">
              <strong>Size:</strong> {product.size}
            </p>
          )}
          {product.colors && (
            <p className="mt-2 text-gray-700 text-sm sm:text-base">
              <strong>Colors:</strong> {product.colors}
            </p>
          )}

          {/* Add to Cart Button */}
          <button 
            onClick={handleAddToCart}
            className="mt-6 w-full bg-[#D4AF37] text-white py-3 sm:py-4 rounded-md font-bold shadow-md
                       hover:bg-[#C09835] transition text-sm sm:text-base"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}