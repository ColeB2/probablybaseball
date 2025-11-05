import { EMAIL_ADDRESS } from "@/utils/constants";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-center text-sm text-gray-500 bg-slate-900">
      <p>© {new Date().getFullYear()} Probably Baseball. All rights reserved.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="/about" className="hover:text-gray-800 transition">About</a>
        <a href={`mailto:${EMAIL_ADDRESS}`}  className="hover:text-gray-800 transition">
            Contact
        </a>
        <a href="/privacy" className="hover:text-gray-800 transition">Privacy</a>
      </div>
    </footer>
  );
}
