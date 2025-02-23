// pages/index.js
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Imperial Creations - Luxury Carpets</title>
        <meta
          name="description"
          content="Discover luxury carpets for your home at Imperial Creations."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      {/* Hero Section with Banner Image */}
      <section className="relative w-full">
        <Image
          src="/images/homepage-banner.png"
          alt="Luxury Carpets by Imperial Creations"
          width={1920}
          height={600}
          layout="responsive"
          className="object-cover"
        />
      </section>

      {/* Why Choose Our Carpets Section */}
      <section className="bg-white py-12 text-center">
        <h2
          className="text-4xl font-bold text-[#3f383d] mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What Sets Us Apart
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          {/* Card 1 - Craftsmanship */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            {/* Decrease the size for mobile, scale up for desktop */}
            <img
              src="/images/expertise.png"
              alt="Craftsmanship"
              className="mx-auto -mb-4 h-auto w-16 sm:w-20 md:w-24"
            />
            <h3 className="text-xl font-semibold text-[#3f383d] mb-2">
              Generations of Craftsmanship
            </h3>
            <p className="text-gray-700 text-sm">
              With decades of experience, we combine traditional carpet-making
              artistry with modern aesthetics to create unmatched luxury.
            </p>
          </div>

          {/* Card 2 - Premium Quality */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src="/images/premium.png"
              alt="Premium Quality"
              className="mx-auto -mb-4 h-auto w-16 sm:w-20 md:w-24"
            />
            <h3 className="text-xl font-semibold text-[#3f383d] mb-2">
              Luxury Within Reach
            </h3>
            <p className="text-gray-700 text-sm">
              Our carpets offer superior quality and intricate craftsmanship at
              prices that rival high-end brands, making luxury more accessible.
              We believe in the art of craftsmanship and the rich heritage of
              Bhadohi.
            </p>
          </div>

          {/* Card 3 - Customization */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src="/images/customization.png"
              alt="Customization"
              className="mx-auto -mb-4 h-auto w-16 sm:w-20 md:w-24"
            />
            <h3 className="text-xl font-semibold text-[#3f383d] mb-2">
              Bhadohi’s Legacy
            </h3>
            <p className="text-gray-700 text-sm">
              As a brand rooted in Bhadohi, Mirzapur, India’s carpet capital, we
              offer best options tailored to your style and home. We believe in
              the art of craftsmanship and the rich heritage of Bhadohi.
            </p>
          </div>

          {/* Card 4 - Durability & Trust */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src="/images/durability.png"
              alt="Durability & Trust"
              className="mx-auto -mb-4 h-auto w-16 sm:w-20 md:w-24"
            />
            <h3 className="text-xl font-semibold text-[#3f383d] mb-2">
              Timeless Durability & Trust
            </h3>
            <p className="text-gray-700 text-sm">
              Every carpet is crafted with premium materials, ensuring
              long-lasting beauty, backed by trusted customer service and
              warranties.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Now Button Section */}
      <section className="bg-white py-12 text-center">
        <h2
          className="text-4xl font-bold text-[#3f383d] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Discover Timeless Elegance
        </h2>
        <p
          className="text-lg text-gray-700 mb-6"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Elevate your home with our handcrafted carpets, blending luxury and
          tradition.
        </p>
        <Link
          href="/shop"
          className="bg-[#d4af37] text-black text-xl px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#b89d30] transition duration-300"
        >
          Shop Now
        </Link>
      </section>

      <Footer />
    </>
  );
}