import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchInput() {
  return (
    <div className="relative h-fit w-fit">
      <input
        type="text"
        placeholder="Search for movies..."
        className="focus:ring-white-500 relative rounded-md border border-white/40 bg-transparent py-2 pr-5 pl-4 backdrop-blur-xs transition-all duration-500 focus:pr-20 focus:ring-1 focus:ring-offset-1 focus:outline-none"
      />
      <IoSearch className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2" />
    </div>
  );
}
