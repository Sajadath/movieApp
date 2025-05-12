import MoviesPageDetails from "@/app/_components/MoviesPageDetails";
import React from "react";

interface PageParams {
  movieId: string;
}

export default async function Page({ params }: { params: PageParams }) {
  const { movieId } = await params;

  return (
    <section className="h-dvh w-dvw overflow-hidden">
      <MoviesPageDetails movieId={movieId} />
    </section>
  );
}
