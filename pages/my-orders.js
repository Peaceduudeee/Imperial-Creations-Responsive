import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      try {
        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc") // Sort orders by most recent
        );
        const ordersSnapshot = await getDocs(ordersQuery);
        const userOrders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(" Failed to load orders.");
      }
      setLoading(false);
    }

    fetchOrders();
  }, [user]);

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center">You have no orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="font-semibold text-lg">Order ID: {order.id}</h3>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                <p><strong>Placed On:</strong> {new Date(order.createdAt.toDate()).toLocaleString()}</p>

                <h4 className="mt-4 text-lg font-semibold">Items Ordered</h4>
                <ul className="list-disc pl-5">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} × {item.qty} - ₹{item.price * item.qty}
                    </li>
                  ))}
                </ul>

                <h4 className="mt-4 text-lg font-semibold">Shipping Address</h4>
                <p>
                  {order.shippingInfo.fullName}, {order.shippingInfo.address}, 
                  {order.shippingInfo.city} - {order.shippingInfo.pincode}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}