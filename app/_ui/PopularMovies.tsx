import Link from "next/link";
import React from "react";

interface ResultType {
  backdrop_path: string;
  id: number;
  popularity: number;
  title: string;
}

export default async function PopularMovies() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  );

  if (!res.ok) {
    return (
      <section id="topRated">
        <div className="text-center text-3xl text-wrap">
          <p>Couldnt Fetch Movies there was a problem fetching</p>
        </div>
      </section>
    );
  }

  const data = await res.json();
  const top5Movies = data.results.slice(0, 5);

  return (
    <section id="topRated" className="overflow-x-hidden pb-30">
      <h3 className="py-7 text-center text-3xl">Top 5 Popular Movies</h3>
      <div className="flex flex-wrap gap-10">
        {top5Movies.map((result: ResultType, index: number) => (
          <Link
            href={`movies/${result.id}`}
            className="relative grow cursor-pointer transition-all duration-300 hover:scale-110"
            key={index}
          >
            <img
              className="mx-auto w-[300px] sm:w-[320px]"
              src={`${IMAGE_URL}/${result.backdrop_path}`}
              alt="Popular Movie"
            />
            <h2 className="absolute right-0 bottom-0 left-0 bg-black/50 px-2 py-1 text-center text-xl text-white">
              {result.title}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
