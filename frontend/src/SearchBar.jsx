function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search blogs..."
        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
