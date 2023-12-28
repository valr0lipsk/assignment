"use client";

import Link from "next/link";
import { type Movie } from "~/lib/types";
import PlusIcon from "../icons/plus";
import LogOutIcon from "../icons/logOut";
import { signOut } from "next-auth/react";
import Image from "next/image";

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
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
        <div className="rounded-xl bg-sky-900 p-2">
          <Image
            alt="alt"
            height={400}
            width={200}
            className="mb-4"
            src="/assets/background"
          />

          <p className="mb-2 px-2 text-xl font-medium">Movie 1</p>

          <p className="mb-2 px-2 text-sm">2021</p>
        </div>
      </div>
    </div>
  );
  // movies.length === 0 ? (
  //   <div className="flex flex-col items-center">
  //     <p className="mb-10 text-5xl font-semibold">Your movie list is empty</p>
  //     <Link
  //       className="rounded-l10 bg-green-400 px-7 py-4 font-bold"
  //       href="/movies/new"
  //     >
  //       Add a new movie
  //     </Link>
  //   </div>
  // ) : (

  // );
};

export default MovieList;
