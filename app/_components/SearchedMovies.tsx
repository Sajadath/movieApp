import React from "react";
import { type MoviesArray } from "./SearchInput";
import Link from "next/link";
import Image from "next/image";

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
            <div className="relative h-25 w-25">
              <Image
                fill
                placeholder="blur"
                src={`${IMAGE_URL}/${movie.poster_path}`}
                alt={`movie picture`}
              />
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
