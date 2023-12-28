import { api } from "~/trpc/server";
import MovieList from "../components/MovieList";

export default async function Movies() {
  const allMovies = await api.movie.getAll.query();
  return (
    <div className="flex flex-col items-center justify-center font-montserrat">
      <MovieList movies={allMovies} />
    </div>
  );
}
