"use client";

import MovieForm from "~/app/components/EditMovieForm";
import { api } from "~/trpc/react";

export default function AddMovie({ params }: { params: { id: string } }) {
  const movieQuery = api.movie.getById.useQuery(params.id);

  return (
    <div className="w-full">
      <h1 className="mb-[7.5rem] text-5xl font-semibold">Edit movie</h1>
      {movieQuery.data && <MovieForm movie={movieQuery.data} />}
    </div>
  );
}
