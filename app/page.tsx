import React from "react";
import Landing from "./_ui/Landing";
import PopularMovies from "./_ui/PopularMovies";

export default async function Page() {
  return (
    <>
      <Landing />
      <PopularMovies />
    </>
  );
}
