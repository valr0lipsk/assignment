"use client";

import Link from "next/link";
import { type Movie } from "~/lib/types";
import PlusIcon from "../icons/plus";
import LogOutIcon from "../icons/logOut";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieList = ({ movies }: { movies: Movie[] }) => {
  const router = useRouter();

  return movies?.length === 0 ? (
    <div className="flex flex-col items-center">
      <p className="mb-10 text-5xl font-semibold">Your movie list is empty</p>
      <Link
        className="rounded-l10 bg-green-400 px-7 py-4 font-bold"
        href="/movies/new"
      >
        Add a new movie
      </Link>
    </div>
  ) : (
    <div className="w-full">
      <div className="mb-[7.5rem] flex w-full justify-between">
        <div className="flex items-center">
          <div className="mr-3 text-5xl font-semibold">My movies</div>
          <Link href="/movies/new">
            <PlusIcon />
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center text-base font-bold"
          onClick={() => signOut()}
        >
          Logout <LogOutIcon className="ml-3" />
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {movies.map((e) => (
          <div
            key={e.id}
            className="cursor-pointer rounded-xl bg-sky-900 p-2"
            onClick={() => router.push(`/movies/${e.id}`)}
          >
            <Image
              alt="alt"
              height={400}
              width={200}
              className="mb-4 h-[400px] w-full"
              src={
                `/api/s3/getS3Url?` +
                new URLSearchParams({ path: e.posterLink }).toString()
              }
            />

            <p className="mb-2 px-2 text-xl font-medium">{e.title}</p>

            <p className="mb-2 px-2 text-sm">{e.publishingYear}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
