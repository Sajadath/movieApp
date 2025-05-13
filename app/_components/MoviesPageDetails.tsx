"use client";
import React, { useEffect, useState } from "react";
import CircularProgressBar from "./CircularProgressbar";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: { id: number; name: string }[];
  production_countries: { name: string }[];
}

export default function MoviesPageDetails({ movieId }: { movieId: string }) {
  const [movie, setMovie] = useState<null | Movie>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
        );
        if (!response.ok) {
          setError("No Movie Found");
          throw new Error("Failed to fetch movie");
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [API_KEY, BASE_URL, movieId]);

  if (!movie) return null;
  if (error)
    return (
      <div className="h-full w-full content-center text-center">
        OOPS : Couldn&apos;t Fetch movie Error : {error} !
      </div>
    );
  if (loading) return <div>Loading</div>;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center bg-black/50 backdrop-blur-xs">
        <div className="relative flex max-w-[70vw] flex-col overflow-y-auto rounded-2xl bg-black/70 md:flex-row lg:max-w-[65vw]">
          <div className="absolute top-2 right-2">
            <CircularProgressBar rating={movie.vote_average} />
          </div>
          <img
            className="h-[200px] rounded-t-2xl object-cover p-4 sm:h-[300px] md:h-full md:w-[300px] md:rounded-t-none md:rounded-l-2xl"
            src={`${IMAGE_URL}${movie.poster_path}`}
            alt=""
          />
          <div className="flex min-w-[100px] flex-col justify-center px-4 py-4 md:min-w-[300px]">
            <h1 className="text-xl font-bold lg:text-3xl">{movie.title}</h1>
            <p className="my-4 grow content-center text-xs lg:max-w-[80%] lg:text-base">
              {movie.overview}
            </p>

            <p className="text-xs lg:text-base">
              Made By:
              {movie.production_countries.map(
                (country) => ` ${country.name}, `,
              )}
            </p>
            <h2 className="text-xs lg:text-base">
              Release Date: {movie.release_date.replaceAll("-", "/")}
            </h2>
            <div className="grow content-center">
              <h2 className="mt-2 text-xs lg:text-base">Genres:</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {movie.genres.map((genre, index) => (
                  <p
                    key={index}
                    className="rounded bg-white px-2 text-xs font-semibold text-black lg:text-sm"
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute top-0 right-0 bottom-0 left-0 -z-10 h-full w-full object-cover"
        src={`${IMAGE_URL}${movie.backdrop_path}`}
        alt=""
      />
    </div>
  );
}
