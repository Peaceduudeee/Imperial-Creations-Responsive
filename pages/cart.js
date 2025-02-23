// pages/cart.js
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import { toast } from "react-toastify";

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  }, [cart]);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#3f383d]">Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="space-y-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between"
                >
                  <div className="flex flex-col md:flex-row items-center w-full space-y-4 md:space-y-0 md:space-x-6">
                    {/* Product Image */}
                    {item.image && (
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-semibold text-[#3f383d]">{item.name}</h3>
                      <p className="text-lg text-gray-700 mt-2">Material: {item.material}</p>
                      <div className="mt-4 flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                          >
                            –
                          </button>
                          <span className="px-4 py-2 text-xl font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Price Section with additional margin */}
                  <div className="mt-4 md:mt-0 ml-0 md:ml-8">
                    <p className="text-2xl font-bold text-[#D4AF37]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-10 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#3f383d]">Cart Summary</h3>
                <p className="text-2xl font-bold text-[#D4AF37]">₹{totalAmount}</p>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}