import React from "react";
import { type MoviesArray } from "./SearchInput";
import Link from "next/link";

export default function SearchedMovies({ movies }: { movies: MoviesArray }) {
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;
  console.log(movies);

  return (
    <ul className="w-full">
      {movies.map((movie, index) => (
        <li className="my-2 w-full" key={index}>
          <Link
            className="flex w-full gap-3 px-4 py-4 hover:bg-white/20"
            href={`/movies/${movie.id}`}
          >
            <div className="relative">
              {movie.poster_path ? (
                <img
                  className="h-25"
                  src={`${IMAGE_URL}/${movie.poster_path}`}
                  alt={`movie picture`}
                />
              ) : (
                <div className="h-25 w-17 content-center text-center">
                  <p>No Image</p>
                </div>
              )}
            </div>
            <div>
              <h2 className="mt-4">{movie.title}</h2>
              <h2 className="mt-4">{movie.release_date}</h2>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
