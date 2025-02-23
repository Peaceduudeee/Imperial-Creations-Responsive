"use client"; // Remove if you're using Next's Pages Router (e.g., /pages). Keep if using Next 13+ App Router with client components.

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

export default function Header() {
  const { user, logout, role } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-[#231000] text-white shadow-lg py-3 md:py-5 px-4 md:px-10 border-b-2 border-[#D4AF37]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Imperial Creations Logo"
              width={190}
              height={70}
              className="cursor-pointer object-contain w-28 sm:w-[190px] h-auto"
            />
          </Link>
        </div>

        {/* Hamburger Icon (mobile only) */}
        <button
          onClick={handleToggle}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          {/* Simple "three lines" icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8 font-semibold tracking-wide
                       text-sm sm:text-base md:text-lg lg:text-xl">
          <Link href="/shop" className="hover:text-[#D4AF37] transition duration-300">
            Shop
          </Link>
          <Link href="/cart" className="hover:text-[#D4AF37] transition duration-300">
            Cart
          </Link>
          <Link href="/about" className="hover:text-[#D4AF37] transition duration-300">
            About Us
          </Link>
          {user && (
            <>
              <Link
                href="/track-order"
                className="hover:text-[#D4AF37] transition duration-300"
              >
                Track Orders
              </Link>
              <Link
                href="/my-orders"
                className="hover:text-[#D4AF37] transition duration-300"
              >
                My Orders
              </Link>
            </>
          )}
          {user && role === "admin" && (
            <Link
              href="/admin"
              className="hover:text-[#D4AF37] transition duration-300"
            >
              Admin Dashboard
            </Link>
          )}
          {/* Authentication Buttons (desktop) */}
          {!user ? (
            <Link
              href="/login"
              className="bg-[#D4AF37] text-black px-3 sm:px-4 md:px-5 py-1 sm:py-2 rounded-md font-bold
                         shadow-md hover:bg-[#C09835] transition text-sm md:text-base lg:text-lg"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-600 text-white px-3 sm:px-4 md:px-5 py-1 sm:py-2 rounded-md font-bold
                         shadow-md hover:bg-red-700 transition text-sm md:text-base lg:text-lg"
            >
              Logout
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Nav Items (slide-down menu) */}
      {isOpen && (
        <nav className="md:hidden mt-2 flex flex-col space-y-1 bg-[#231000] border-t border-[#D4AF37] pt-3">
          <Link
            href="/shop"
            className="px-4 py-2 hover:text-[#D4AF37]"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="px-4 py-2 hover:text-[#D4AF37]"
            onClick={() => setIsOpen(false)}
          >
            Cart
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 hover:text-[#D4AF37]"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          {user && (
            <>
              <Link
                href="/track-order"
                className="px-4 py-2 hover:text-[#D4AF37]"
                onClick={() => setIsOpen(false)}
              >
                Track Orders
              </Link>
              <Link
                href="/my-orders"
                className="px-4 py-2 hover:text-[#D4AF37]"
                onClick={() => setIsOpen(false)}
              >
                My Orders
              </Link>
            </>
          )}
          {user && role === "admin" && (
            <Link
              href="/admin"
              className="px-4 py-2 hover:text-[#D4AF37]"
              onClick={() => setIsOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}

          {/* Auth Buttons (mobile) */}
          {!user ? (
            <Link
              href="/login"
              className="px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-md mx-4 mt-2 text-center
                         hover:bg-[#C09835] transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded-md mx-4 mt-2
                         hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}