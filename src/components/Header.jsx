import { UserRound } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white px-6 py-4 border-b shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-blue-600">🎁 DelightLoop</span>
      </div>

      <nav className="flex items-center gap-6 text-sm font-medium text-gray-900">
        <a
          href="#contact"
          className="hover:text-blue-600 transition"
        >
          Contact
        </a>
        <a
          href="#signup"
          className="hover:text-blue-600 transition"
        >
          Sign Up
        </a>
        <UserRound className="w-5 h-5 text-gray-700 hover:text-blue-600 cursor-pointer" />
      </nav>
    </header>
  );
}

export default Header;
