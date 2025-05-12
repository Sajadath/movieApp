"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Landing() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative h-dvh w-full overflow-hidden text-center">
      <div className="absolute z-0 h-full w-full bg-black/50"></div>
      <div className="absolute top-1/2 left-1/2 z-10 -translate-1/2">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Welcome To{" "}
          <span className="text-4xl text-red-400 sm:text-5xl">Movie App</span>
        </h1>
        <h2 className="mt-5 mb-4 px-2 text-xs text-nowrap sm:text-sm">
          a website to discover movies informations
        </h2>
        <Link
          className="rounded-2xl border border-white/60 px-3 py-1 text-xl text-nowrap transition-all duration-300 hover:opacity-80"
          href="#topRated"
        >
          Top Rated Movies
        </Link>
      </div>
      {isClient && (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/landingVideo.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
}
