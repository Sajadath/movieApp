import React from "react";
import { type MoviesArray } from "./SearchInput";

export default function SearchedMovies({ movies }: { movies: MoviesArray }) {
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  return (
    <ul className="w-full">
      {movies.map((movie, index) => (
        <li className="my-2 w-full" key={index}>
          <a
            className="flex w-full gap-3 px-4 py-4 hover:bg-white/20"
            href={`/movies/${movie.id}`}
          >
            <div className="relative h-30 w-20">
              {movie.poster_path ? (
                <img
                  className={`w-20`}
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
              <h2 className="mt-4">{movie.release_date.split("-")[0]}</h2>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
