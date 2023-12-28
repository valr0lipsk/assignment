import MovieForm from "~/app/components/MovieForm";

export default function AddMovie() {
  return (
    <div className="w-full">
      <h1 className="mb-[7.5rem] text-5xl font-semibold">Create a new movie</h1>
      <MovieForm />
    </div>
  );
}
