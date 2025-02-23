// pages/about.js
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>About Us - Imperial Creations</title>
        <meta name="description" content="Learn about the rich heritage of carpet making in Mirzapur and how Imperial Creations brings tradition and luxury together." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      
      <Header />
      
      <main className="flex-grow max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-[#3f383d] text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          About Imperial Creations
        </h1>
        <section className="space-y-6 text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
          <p>
            Nestled in the heart of Mirzapur, the carpet capital of India, Imperial Creations is a tribute to centuries of rich craftsmanship and tradition. Mirzapur has been synonymous with exquisite hand-knotted carpets for generations. The art of carpet making here has been passed down through families, blending ancient techniques with modern design to create masterpieces that grace homes across the world.
          </p>
          <p>
            Our journey began with a deep-rooted passion for preserving this cultural heritage. Each carpet we create is a labor of love, combining intricate patterns, vibrant colors, and the finest natural materials. The master artisans of Mirzapur infuse each piece with their expertise, ensuring that every carpet is not only a work of art but also a symbol of enduring quality and sophistication.
          </p>
          <p>
            At Imperial Creations, we believe that every carpet tells a story—a story of heritage, meticulous craftsmanship, and a relentless pursuit of perfection. Our collection represents the best of Mirzapur’s legacy, offering a diverse range of designs that cater to both traditional tastes and contemporary aesthetics.
          </p>
          <p>
            Join us as we celebrate the timeless art of carpet making and bring the elegance of Mirzapur right into your home.
          </p>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}