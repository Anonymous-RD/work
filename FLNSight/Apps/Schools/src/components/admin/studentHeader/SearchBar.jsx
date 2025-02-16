import * as React from "react";

function SearchBar() {
  return (
    <form className="flex gap-4 items-center py-3 pr-16 pl-4 text-sm text-gray-400 rounded-2xl border border-solid bg-stone-50 border-neutral-100">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/436e8d12b2c4bf1a809d9e27f15e88b7e1cdf572434f2fec5c9d1e691515126a?placeholderIfAbsent=true&apiKey=570f55ce70204892933062ae112e6b9d"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
      />
      <label htmlFor="searchInput" className="sr-only">Search anything on Students</label>
      <input
        type="search"
        id="searchInput"
        className="self-stretch my-auto bg-transparent border-none outline-none w-full"
        placeholder="Search anything on Students"
        aria-label="Search anything on Students"
      />
    </form>
  );
}

export default SearchBar;










