import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const router = useRouter();
  const { user, loginWithGoogle, registerWithEmail, loginWithEmail } = useAuth();
  const [identifier, setIdentifier] = useState(""); // Email or Mobile Number
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/shop");
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      await registerWithEmail(identifier, password);
    } else {
      await loginWithEmail(identifier, password, router);
    }
  };

  return (
    <div className="relative w-full h-screen flex flex-col">
      {/* Blurred Header */}
      <div className="absolute top-0 left-0 w-full z-20 backdrop-blur-lg bg-black bg-opacity-40">
        <Header />
      </div>

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/login-bg.jpg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Centered Card */}
      <div className="relative flex-grow flex items-center justify-center">
        <div
          className="bg-white bg-opacity-30 backdrop-blur-lg shadow-2xl rounded-lg
                     p-4 sm:p-6 md:p-8 w-full max-w-md text-center
                     border border-white border-opacity-50
                     mx-4 sm:mx-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {isRegistering ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mt-2">
            {isRegistering
              ? "Join us today and explore our offerings."
              : "Sign in to continue"}
          </p>

          {/* Google Login Button */}
          <button
            onClick={loginWithGoogle}
            className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-red-700 transition mt-4 text-sm sm:text-base"
          >
            Sign in with Google
          </button>

          <div className="text-gray-300 my-3 sm:my-4">OR</div>

          {/* Email/Mobile & Password Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input
              type="text"
              placeholder="Email or Mobile Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg shadow-sm text-sm sm:text-base"
            />
            <button
              type="submit"
              className="w-full bg-[#D4AF37] text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-[#C09835] transition text-sm sm:text-base"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          {/* Toggle between Registration and Login */}
          <p className="mt-3 sm:mt-4 text-gray-300 text-xs sm:text-sm">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[#D4AF37] underline hover:text-[#C09835] transition"
            >
              {isRegistering ? "Login here" : "Register here"}
            </button>
          </p>
        </div>
      </div>

      {/* Blurred Footer */}
      <div className="absolute bottom-0 left-0 w-full z-20 backdrop-blur-lg bg-black bg-opacity-40">
        <Footer />
      </div>
    </div>
  );
}