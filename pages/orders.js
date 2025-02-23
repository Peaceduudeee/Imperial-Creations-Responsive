// pages/orders.js
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function fetchOrders() {
      const ordersQuery = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(ordersQuery);
      const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(userOrders);
    }

    fetchOrders();
  }, [user]);

  return (
    <>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}