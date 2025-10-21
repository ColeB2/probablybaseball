import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center bg-slate-900 backdrop-blur-md sticky top-0 z-50">
      <Link href="/" className="text-2xl font-bold hover:opacity-80 transition text-white">
        Probably Baseball
      </Link>

      <div className="flex gap-6 text-sm font-medium text-white">
        <Link href="/" className="hover:text-gray-400 transition">
          Home
        </Link>
        <Link href="/articles" className="hover:text-gray-400 transition">
          Articles
        </Link>
        <Link href="#" className="hover:text-gray-400 transition">
          About
        </Link>
        <Link href="#" className="hover:text-gray-400 transition">
          Contact
        </Link>
      </div>
    </nav>
  );
}
