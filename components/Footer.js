export default function Footer() {
  return (
    <footer className="bg-[#231000] text-gray-400 text-center py-4 sm:py-6 border-t border-[#D4AF37]">
      <p className="text-base sm:text-lg font-semibold tracking-widest">
        © {new Date().getFullYear()} Imperial Creations. All Rights Reserved.
      </p>
      <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
        Crafted with elegance, woven with tradition.
      </p>
    </footer>
  );
}