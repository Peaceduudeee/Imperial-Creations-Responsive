import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/productModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => {
          let product = { id: doc.id, ...doc.data() };

          // Ensure the correct image URL
          if (product.image) {
            if (!product.image.startsWith("http")) {
              console.warn(`Invalid image URL for ${product.name}: ${product.image}`);
              product.image = "/images/placeholder.jpg"; // Fallback image
            }
          } else {
            product.image = "/images/placeholder.jpg"; // Default fallback
          }
          return product;
        });

        setProducts(productList);
        setLoading(false);
      } catch (error) {
        console.error(" Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.material?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <Image
            src="/images/shop.jpg"
            alt="Luxury Carpets Collection"
            fill
            quality={90}
            style={{ objectFit: "cover" }}
            className="w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            {/* Heading is slightly smaller on very small screens */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Discover Timeless Elegance
            </h1>
            <p
              className="text-sm sm:text-base md:text-lg text-gray-200 mt-2 sm:mt-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Browse our handcrafted luxury carpets
            </p>
          </div>
        </section>

        {/* Premium Search & Sort Section */}
        <section className="bg-[#f8f4ee] py-8 sm:py-12 px-4 sm:px-6 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Search Bar */}
            <div className="relative w-full md:w-2/3">
              <input
                type="text"
                placeholder="Search luxury carpets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 sm:p-4 pl-10 sm:pl-12 border border-gray-400 rounded-lg shadow-sm
                           focus:ring-2 focus:ring-[#D4AF37] bg-white text-gray-900 placeholder-gray-600
                           text-base sm:text-lg"
              />
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 sm:w-6 h-5 sm:h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a8 8 0 105.25 14.18l4.94 4.94a1 1 0 001.41-1.42l-4.94-4.94A8 8 0 0010 2zm0 2
                       a6 6 0 100 12 6 6 0 000-12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Sort Dropdown */}
            <div className="relative w-full md:w-1/3">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-3 sm:p-4 border border-gray-400 rounded-lg shadow-sm bg-white
                           focus:ring-2 focus:ring-[#D4AF37] cursor-pointer hover:bg-gray-100 transition
                           text-base sm:text-lg"
              >
                <option value="">Sort by Price</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </section>

        {/* Product Display Section */}
        <section className="bg-white py-10 sm:py-12">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <p className="text-center text-base sm:text-lg text-gray-700">
                Loading products...
              </p>
            ) : sortedProducts.length === 0 ? (
              <p className="text-center text-red-500 text-base sm:text-lg">
                No products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {sortedProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}