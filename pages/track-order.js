import { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!orderId.trim()) {
      toast.error("Pleaseenter a valid Order ID");
      return;
    }

    setLoading(true);
    try {
      const orderRef = doc(db, "orders", orderId);
      const orderSnapshot = await getDoc(orderRef);

      if (!orderSnapshot.exists()) {
        toast.error(" Order not found. Please check the Order ID.");
        setLoading(false);
        return;
      }

      setOrderData(orderSnapshot.data());
      setLoading(false);
    } catch (error) {
      console.error(" Error tracking order:", error);
      toast.error(" Failed to track order. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main content wrapped in a flex-grow container */}
      <div className="flex-grow">
        <div className="p-6 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Track Your Order</h2>
          <div className="bg-gray-100 p-4 rounded-md mb-6">
            <input
              type="text"
              placeholder="Enter Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={trackOrder}
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Tracking..." : "Track Order"}
            </button>
          </div>

          {/* ✅ Order Details Section */}
          {orderData && (
            <div className="bg-white p-4 shadow-md rounded-md">
              <h3 className="text-xl font-semibold mb-2">Order Details</h3>
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Status:</strong> {orderData.status}</p>
              <p><strong>Payment Method:</strong> {orderData.paymentMethod}</p>
              <p><strong>Total Amount:</strong> ₹{orderData.totalAmount}</p>

              <h4 className="mt-4 text-lg font-semibold">Shipping Information</h4>
              <p><strong>Name:</strong> {orderData.shippingInfo.fullName}</p>
              <p><strong>Phone:</strong> {orderData.shippingInfo.phone}</p>
              <p>
                <strong>Address:</strong> {orderData.shippingInfo.address}, 
                {orderData.shippingInfo.city} - {orderData.shippingInfo.pincode}
              </p>

              <h4 className="mt-4 text-lg font-semibold">Items Ordered</h4>
              <ul className="list-disc pl-5">
                {orderData.items.map((item, index) => (
                  <li key={index}>
                    {item.name} × {item.qty} - ₹{item.price * item.qty}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}