import * as React from "react";

function SearchBar() {
  return (
    <form
      className="flex gap-3 items-center sm:mt-2 px-4 py-2 sm:py-3 rounded-xl border-none border-neutral-200 bg-gray-100 
                 text-base text-gray-500 w-full sm:w-72 max-w-lg "
    >
      {/* Search Icon */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/436e8d12b2c4bf1a809d9e27f15e88b7e1cdf572434f2fec5c9d1e691515126a"
        alt="Search Icon"
        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
      />

      {/* Input Field */}
      <label htmlFor="searchInput" className="sr-only">
        Search anything on Teachers
      </label>
      <input
        type="search"
        id="searchInput"
        className="w-full bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400"
        placeholder="Search anything on Teachers"
        aria-label="Search anything on Teachers"
      />
    </form>
  );
}

export default SearchBar;
