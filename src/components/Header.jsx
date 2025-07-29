function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-blue-600">
        🎁 DelightLoop Campaign Builder
      </h1>
      <a
        href="https://delightloop.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-600 hover:underline"
      >
        Visit Website
      </a>
    </header>
  );
}

export default Header;
