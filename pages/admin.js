import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    async function fetchOrdersAndProducts() {
      try {
        // Fetch orders
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // Fetch products
        const productsSnapshot = await getDocs(collection(db, "products"));
        setProducts(productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchOrdersAndProducts();
  }, [user, router]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
      toast.success(` Order ${orderId} marked as ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(" Failed to update order.");
    }
  };

  const updateStock = async (productId, newStock) => {
    try {
      await updateDoc(doc(db, "products", productId), { stock: newStock });
      setProducts(products.map(product => (product.id === productId ? { ...product, stock: newStock } : product)));
      // toast.success(`✅ Stock updated for ${productId}`);
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error(" Failed to update stock.");
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

        {/* Orders Section */}
        <h3 className="text-2xl font-semibold mb-4">Manage Orders</h3>
        {orders.length === 0 ? (
          <p className="text-center">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                <h3 className="font-semibold text-lg">Order ID: {order.id}</h3>
                <p>Status: <strong>{order.status}</strong></p>
                <p>Total: ₹{order.totalAmount}</p>
                <p>Payment: {order.paymentMethod}</p>
                <p>Customer: {order.shippingInfo.fullName}, {order.shippingInfo.phone}</p>
                <div className="mt-2">
                  {order.status !== "Delivered" && (
                    <button onClick={() => updateOrderStatus(order.id, "Shipped")} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2">Mark as Shipped</button>
                  )}
                  {order.status === "Shipped" && (
                    <button onClick={() => updateOrderStatus(order.id, "Delivered")} className="bg-green-500 text-white px-3 py-1 rounded-md">Mark as Delivered</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inventory Management Section */}
        <h3 className="text-2xl font-semibold mt-8 mb-4">Manage Inventory</h3>
        {products.length === 0 ? (
          <p className="text-center">No products available.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
                <div>
                  <h4 className="font-semibold">{product.name}</h4>
                  <p>Stock: {product.stock}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  value={product.stock}
                  onChange={(e) => updateStock(product.id, parseInt(e.target.value))}
                  className="border p-2 w-20"
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}