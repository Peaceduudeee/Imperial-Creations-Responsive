import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function OrderConfirmation() {
  const router = useRouter();
  const { orderId } = router.query;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Main content flex to center vertically */}
      <main className="flex-grow flex items-center justify-center px-4">
        {/* Card container */}
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">
            ✅ Order Placed Successfully!
          </h2>
          <p className="text-gray-800">
            Thank you for your purchase. Your order ID is:
          </p>
          <p className="text-lg font-semibold text-gray-700 mt-2">
            {orderId}
          </p>
          <p className="mt-3 text-gray-700">
            We will update you when your order is shipped.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            You can also track your order by entering this Order ID in our
            <span className="font-medium text-black"> "Track Order" </span> 
            section.
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="mt-6 bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}