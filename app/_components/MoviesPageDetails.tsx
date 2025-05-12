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
        <div className="flex max-w-[80vw] flex-col rounded-2xl bg-black/70 md:flex-row xl:max-w-[65vw]">
          <img
            width={300}
            height={500}
            className="w-[300px] object-cover p-4"
            src={`${IMAGE_URL}/${movie.poster_path}`}
            alt=""
          />
          <div className="content-center">
            <h1 className="p-5 text-3xl font-bold">{movie.title}</h1>
            <p className="my-4 max-w-[80%] px-4">{movie.overview}</p>
            <div className="mt-8 flex items-center justify-between px-4">
              <div>
                <p>
                  Made By:{" "}
                  {movie.production_countries.map(
                    (country) => ` ${country.name}, `,
                  )}
                </p>
                <h2>Release Date: {movie.release_date.replaceAll("-", "/")}</h2>
                <h2>Genres: </h2>
                <div className="mt-2 flex gap-4">
                  {movie.genres.map((genre, index) => (
                    <p
                      key={index}
                      className="rounded bg-white px-2 text-sm font-semibold text-black"
                    >
                      {genre.name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="pr-10">
                <CircularProgressBar rating={8} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        className="absolute top-0 right-0 bottom-0 left-0 -z-10 h-full w-full object-cover"
        src={`${IMAGE_URL}/${movie.backdrop_path}`}
        alt=""
      />
    </div>
  );
}
