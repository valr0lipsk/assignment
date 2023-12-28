import MovieList from "../components/MovieList";

export default function Movies() {
  return (
    <div className="flex flex-col items-center justify-center font-montserrat">
      <MovieList movies={[]} />
    </div>
  );
}
