import React from "react";

export default function SearchedMoviesLoading() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex animate-pulse gap-4 px-4 py-4">
        <div className="h-30 w-20 rounded bg-white/40"></div>
        <div>
          <div className="mt-4 h-3 w-30 rounded bg-white/40"></div>
          <div className="mt-4 h-3 w-20 rounded bg-white/40"></div>
        </div>
      </div>
      <div className="flex animate-pulse gap-4 px-4 py-4">
        <div className="h-30 w-20 rounded bg-white/40"></div>
        <div>
          <div className="mt-4 h-3 w-30 rounded bg-white/40"></div>
          <div className="mt-4 h-3 w-20 rounded bg-white/40"></div>
        </div>
      </div>
      <div className="flex animate-pulse gap-4 px-4 py-4">
        <div className="h-30 w-20 rounded bg-white/40"></div>
        <div>
          <div className="mt-4 h-3 w-30 rounded bg-white/40"></div>
          <div className="mt-4 h-3 w-20 rounded bg-white/40"></div>
        </div>
      </div>
    </div>
  );
}
