"use client";

import { api } from "~/trpc/react";
import MovieList from "../components/MovieList";

export default function Movies() {
  const allMoviesQuery = api.movie.getAll.useQuery();

  return (
    <div className="flex flex-col items-center justify-center font-montserrat">
      {!allMoviesQuery.data && (
        <div className="h-20 w-20 animate-spin rounded-full border-8 border-gray-300 border-t-black-900" />
      )}
      {allMoviesQuery.data && <MovieList movies={allMoviesQuery.data} />}
    </div>
  );
}
