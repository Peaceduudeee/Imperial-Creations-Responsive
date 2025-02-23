// pages/checkout.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Image from "next/image";
import axios from "axios";

export default function Checkout() {
  const { user } = useAuth();
  // Destructure cart functions from CartContext
  const { cart, setCart, updateCartQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [isShippingDetailsFilled, setIsShippingDetailsFilled] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  }, [cart, user, router]);

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  // Dynamically load Razorpay script (if not already loaded)
  const loadRazorpayScript = async () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to place the order in Firestore after successful payment or COD
  const placeOrder = async (paymentMethod, transactionId) => {
    try {
      const orderId = `order_${Date.now()}`;
      let updatedCart = [];

      // 1. Check inventory for each item
      for (const item of cart) {
        const productRef = doc(db, "products", item.id);
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
          toast.error(` ${item.name} no longer exists.`);
          return;
        }

        const currentStock = productDoc.data().stock || 0;
        if (currentStock < item.quantity) {
          toast.error(
            ` Not enough stock for ${item.name}. Available: ${currentStock}`
          );
          return;
        }

        updatedCart.push({
          ...item,
          remainingStock: currentStock - item.quantity,
        });
      }

      // 2. Reduce stock in Firestore
      for (const item of updatedCart) {
        const productRef = doc(db, "products", item.id);
        await updateDoc(productRef, { stock: item.remainingStock });
        console.log(
          `✅ Updated stock for ${item.name}: ${item.remainingStock} left`
        );
      }

      // 3. Save order in Firestore
      const orderData = {
        userId: user.uid,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          qty: item.quantity,
          price: item.price,
        })),
        totalAmount,
        shippingInfo,
        paymentMethod,
        transactionId,
        status: "Processing",
        createdAt: Timestamp.now(),
      };

      await setDoc(doc(db, "orders", orderId), orderData);

      // 4. Clear cart after order placement
      const cartRef = collection(db, "users", user.uid, "cartItems");
      const cartSnapshot = await getDocs(cartRef);
      cartSnapshot.forEach(async (docItem) => {
        await deleteDoc(doc(db, "users", user.uid, "cartItems", docItem.id));
      });

      setCart([]);
      toast.success("✅ Order placed successfully! Inventory updated.");
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error(" Error placing order:", error);
      toast.error(" Failed to place order. Try again.");
    }
  };

  // Razorpay Payment Integration
  const handleRazorpayPayment = async () => {
    if (!isShippingDetailsFilled) {
      toast.error("Please enter shipping details first!");
      return;
    }
    if (cart.length === 0) {
      toast.error(" Your cart is empty!");
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      toast.error(
        " Razorpay SDK failed to load. Check your internet connection."
      );
      return;
    }

    try {
      // Create Razorpay order via your backend (amount in paise)
      const response = await axios.post("/api/razorpay", {
        totalAmount: totalAmount * 100, // convert ₹ to paise
      });

      const orderData = response.data;
      if (!orderData.id) {
        throw new Error("Razorpay order creation failed");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Imperial Creations",
        description: "Carpet Purchase",
        order_id: orderData.id,
        handler: async function (response) {
          console.log("Payment Success:", response);
          await placeOrder("Online Payment (Razorpay)", response.razorpay_payment_id);
        },
        prefill: {
          name: shippingInfo.fullName,
          email: user.email,
          contact: shippingInfo.phone,
        },
        theme: { color: "#FF5733" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(" Razorpay Payment Error:", error);
      toast.error(" Payment failed. Try again.");
    }
  };

  // Cash on Delivery Order Placement
  const handleCashOnDelivery = async () => {
    if (!isShippingDetailsFilled) {
      toast.error("Please enter shipping details first!");
      return;
    }
    if (cart.length === 0) {
      toast.error(" Your cart is empty!");
      return;
    }
    await placeOrder("Cash on Delivery", "COD_ORDER");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow p-6 max-w-4xl mx-auto">
        {!isShippingDetailsFilled ? (
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h2
              className="text-3xl font-bold text-[#3f383d] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Enter Your Shipping Address
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-xl font-semibold text-gray-800 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  value={shippingInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-800 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your phone number"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xl font-semibold text-gray-800 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street, area, etc."
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Your city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-xl font-semibold text-gray-800 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Your pincode"
                    value={shippingInfo.pincode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsShippingDetailsFilled(true)}
                className="w-full bg-[#D4AF37] text-white py-3 rounded-lg font-semibold shadow-md hover:bg-[#C09835] transition"
              >
                Save Address & Proceed
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-2xl">
            <h2
              className="text-3xl font-bold text-[#3f383d] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Order Summary
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-md"
                >
                  <div className="flex items-center space-x-4 w-full">
                    {item.image && (
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div className="w-full">
                      <h3 className="text-2xl font-semibold text-[#3f383d]">
                        {item.name}
                      </h3>
                      <p className="text-lg text-gray-700">
                        Material: {item.material}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <button
                          onClick={() => {
                            const newQty = Math.max(1, item.quantity - 1);
                            updateCartQuantity(item.id, newQty);
                          }}
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                          –
                        </button>
                        <span className="px-4 py-2 text-xl font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-2xl font-bold text-[#D4AF37]">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-white p-6 rounded-lg shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-[#3f383d]">
                  Cart Total
                </h3>
                <p className="text-2xl font-bold text-[#D4AF37]">
                  ₹{totalAmount}
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <button
                  onClick={handleRazorpayPayment}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
                >
                  Pay Online (Razorpay)
                </button>
                <button
                  onClick={handleCashOnDelivery}
                  className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition"
                >
                  Cash on Delivery
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}