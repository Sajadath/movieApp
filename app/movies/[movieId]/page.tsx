import MoviesPageDetails from "@/app/_components/MoviesPageDetails";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;

  return (
    <section className="h-dvh w-dvw overflow-hidden">
      <MoviesPageDetails movieId={movieId} />
    </section>
  );
}
