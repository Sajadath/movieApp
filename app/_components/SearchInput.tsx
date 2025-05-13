import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import SearchedMovies from "./SearchedMovies";
import SearchedMoviesLoading from "./SearchedMoviesLoading";

export type MoviesArray = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}[];

export default function SearchInput() {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [query, setQuery] = useState<string>("");
  const [inputFocused, setInputFocused] = useState(false);
  const [movies, setMovies] = useState<MoviesArray>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noMoviesFound, setNoMoviesFound] = useState(false);

  async function fetchMovies(query: string) {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movies.");
      }

      const data = await response.json();
      setMovies(data.results);
      if (data.results.length < 1) setNoMoviesFound(true);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNoMoviesFound(false);
      fetchMovies(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="relative h-fit w-fit">
      <div
        className={`${inputFocused ? "scale-y-100" : "scale-y-0"} absolute top-full right-0 left-0 max-h-[60vh] origin-top overflow-y-auto rounded-b-2xl bg-black/90 transition-all duration-300`}
      >
        {loading && <SearchedMoviesLoading />}
        {error && <p className="py-4 text-center"> {error}</p>}
        {noMoviesFound && <p className="py-4 text-center">No Movies found!</p>}
        {movies.length > 0 && <SearchedMovies movies={movies} />}
      </div>
      <input
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Search for movies..."
        className="focus:ring-white-500 relative w-[200px] rounded-md border border-white/40 bg-transparent py-2 pr-5 pl-4 text-center backdrop-blur-xs transition-all duration-500 focus:w-[250px] focus:ring-1 focus:ring-offset-1 focus:outline-none md:w-[280px] md:focus:w-[380px] lg:focus:w-[580px]"
      />
      <IoSearch className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2" />
    </div>
  );
}
