import { UserRound } from "lucide-react";

function Header() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b">
      {/* Left: App Name */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-blue-600">🎁 DelightLoop</span>
        <span className="text-sm text-gray-500 hidden sm:inline">Campaign Builder</span>
      </div>

      {/* Right: Navigation */}
      <nav className="flex items-center space-x-6 text-sm">
        <a
          href="#contact"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Contact
        </a>
        <a
          href="#signup"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Sign Up
        </a>
        <UserRound className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
      </nav>
    </header>
  );
}

export default Header;
