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
      <div className="relative bg-white rounded-xl p-8 z-50 max-w-4xl w-full mx-4">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 h-96 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="mt-6 md:mt-0 md:ml-8 flex-1">
            <h2 className="text-4xl font-bold text-[#3f383d]">{product.name}</h2>
            <p className="text-3xl font-bold text-[#D4AF37] mt-4">₹{product.price}</p>
            <p className="mt-6 text-lg text-gray-700">{product.description || "No description available."}</p>
            {product.size && (
              <p className="mt-4 text-lg"><strong>Size:</strong> {product.size}</p>
            )}
            {product.colors && (
              <p className="mt-4 text-lg"><strong>Colors:</strong> {product.colors}</p>
            )}
            <button 
              onClick={handleAddToCart}
              className="mt-8 w-full bg-[#D4AF37] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-[#C09835] transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}