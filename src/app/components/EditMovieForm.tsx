"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FileInput from "./FileInput";
import {
  type MovieSchemaType,
  type MovieEditSchemaType,
  MovieEditSchema,
} from "~/lib/schemas";
import InputWrapper from "./InputWrapper";
import Input from "./Input";
import { api } from "~/trpc/react";
import { trpcNext } from "~/trpc/next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type Movie } from "~/lib/types";

const MovieForm = ({ movie }: { movie: Movie }) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<MovieEditSchemaType>({
    resolver: zodResolver(MovieEditSchema),
    defaultValues: {
      publishYear: movie.publishingYear,
      ...movie,
      file: movie.posterLink,
    },
  });

  const router = useRouter();
  const utils = trpcNext.useContext();

  const updateMovieMutation = api.movie.update.useMutation({
    onSuccess: () => {
      router.push("/movies");
    },
  });

  const handleFormSubmit = async () => {
    const val: MovieEditSchemaType = getValues();

    const file = (val.file as File[])[0];

    if (file && file.name !== movie.posterLink) {
      const url = await utils.s3.getS3AnimationUploadUrl.fetch(file.name);

      const upload = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": "application/fbx" },
      });

      if (upload.ok) {
        const newMovie: MovieSchemaType = {
          id: movie.id,
          posterLink: file.name,
          title: val.title,
          publishYear: val.publishYear,
        };

        updateMovieMutation.mutate(newMovie);
      }
    } else if (isDirty) {
      const newMovie: MovieSchemaType = {
        id: movie.id,
        posterLink: movie.posterLink,
        title: val.title,
        publishYear: val.publishYear,
      };

      updateMovieMutation.mutate(newMovie);
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit(handleFormSubmit)}>
      <FileInput
        register={register}
        name="file"
        error={errors.file?.message?.toString()}
        setValue={setValue}
        className="mr-32 h-[32rem] w-[30rem]"
        preSelectedFileName={movie.posterLink}
      />

      <fieldset className="w-[23rem]">
        <InputWrapper
          error={errors.title?.message?.toString()}
          className="mb-4"
        >
          <Input
            inputType="title"
            name="title"
            placeholder="Title"
            register={register}
          />
        </InputWrapper>

        <InputWrapper
          error={errors.publishYear?.message?.toString()}
          className="w-2/3"
        >
          <Input
            inputType="number"
            name="publishYear"
            placeholder="Publish Year"
            register={register}
          />
        </InputWrapper>

        <div className="mt-16 flex gap-4">
          <Link
            className="w-full rounded-l10 border border-white  bg-transparent py-4 text-center disabled:opacity-70"
            href="/movies"
          >
            Cancel
          </Link>
          <button
            className="w-full rounded-l10 border border-green-400 bg-green-400 py-4 disabled:opacity-70"
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default MovieForm;
