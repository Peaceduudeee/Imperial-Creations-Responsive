import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Contact Us - Imperial Creations</title>
        <meta name="description" content="Get in touch with Imperial Creations for any queries about our luxury carpets." />
      </Head>

      <Header />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Contact Us
        </h1>
        
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input type="text" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea className="w-full p-2 border rounded-md h-32"></textarea>
              </div>
              <button className="bg-[#D4AF37] text-white px-6 py-2 rounded-md hover:bg-[#B4941F] transition">
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Visit Our Store</h2>
            <p className="text-gray-700">
              Imperial Creations<br />
              123 Carpet Lane<br />
              Mirzapur, Uttar Pradesh<br />
              India
            </p>
            <div className="mt-4">
              <p className="text-gray-700">
                <strong>Phone:</strong> +91 1234567890<br />
                <strong>Email:</strong> info@imperialcreations.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
